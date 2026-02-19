package com.firma.backend.service;

import com.firma.backend.dto.ProductPageResponse;
import com.firma.backend.dto.ProductRequest;
import com.firma.backend.dto.ProductResponse;
import com.firma.backend.exception.ForbiddenException;
import com.firma.backend.exception.NotFoundException;
import com.firma.backend.model.Product;
import com.firma.backend.model.User;
import com.firma.backend.repository.ProductRepository;
import com.firma.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final MongoTemplate mongoTemplate;
    private final GridFsTemplate gridFsTemplate;

    // ── Read ─────────────────────────────────────────────────────────────────

    public ProductPageResponse list(String q, String category, String region,
                                    Double minPrice, Double maxPrice,
                                    int page, int size) {

        Query query = buildQuery(q, category, region, minPrice, maxPrice);

        // Count without pagination
        long total = mongoTemplate.count(query, Product.class);

        // Apply sorting (newest first) + pagination
        query.with(Sort.by(Sort.Direction.DESC, "createdAt"))
             .with(PageRequest.of(page, size));

        List<Product> products = mongoTemplate.find(query, Product.class);

        // Bulk-load sellers to avoid N+1
        Map<String, User> sellersById = loadSellers(products);

        List<ProductResponse> responses = products.stream()
                .map(p -> ProductMapper.toResponse(p, sellersById.get(p.getSellerId())))
                .collect(Collectors.toList());

        int totalPages = size == 0 ? 1 : (int) Math.ceil((double) total / size);
        return new ProductPageResponse(responses, page, size, total, totalPages);
    }

    public ProductResponse getById(String id) {
        Product p = findOrThrow(id);
        User seller = p.getSellerId() != null
                ? userRepository.findById(p.getSellerId()).orElse(null)
                : null;
        return ProductMapper.toResponse(p, seller);
    }

    // ── Create ───────────────────────────────────────────────────────────────

    public ProductResponse create(ProductRequest req, MultipartFile image, String sellerId) {
        Product p = Product.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .category(req.getCategory())
                .price(req.getPrice())
                .unit(req.getUnit())
                .address(req.getAddress())
                .region(req.getRegion())
                .sellerId(sellerId)
                .build();

        if (image != null && !image.isEmpty()) {
            storeImage(p, image);
        }

        Product saved = productRepository.save(p);
        User seller = userRepository.findById(sellerId).orElse(null);
        return ProductMapper.toResponse(saved, seller);
    }

    // ── Update (full or partial) ──────────────────────────────────────────────

    public ProductResponse update(String id, ProductRequest req, MultipartFile image, String requesterId) {
        Product p = findOrThrow(id);
        assertOwner(p, requesterId);

        p.setTitle(req.getTitle());
        p.setDescription(req.getDescription());
        p.setCategory(req.getCategory());
        p.setPrice(req.getPrice());
        p.setUnit(req.getUnit());
        p.setAddress(req.getAddress());
        p.setRegion(req.getRegion());

        if (image != null && !image.isEmpty()) {
            storeImage(p, image);
        }

        Product saved = productRepository.save(p);
        User seller = userRepository.findById(requesterId).orElse(null);
        return ProductMapper.toResponse(saved, seller);
    }

    // ── Delete ────────────────────────────────────────────────────────────────

    public void delete(String id, String requesterId) {
        Product p = findOrThrow(id);
        assertOwner(p, requesterId);
        productRepository.deleteById(id);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private Product findOrThrow(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found: " + id));
    }

    private void assertOwner(Product p, String requesterId) {
        if (p.getSellerId() == null || !p.getSellerId().equals(requesterId)) {
            throw new ForbiddenException("You do not own this listing");
        }
    }

    private void storeImage(Product p, MultipartFile image) {
        try {
            var objectId = gridFsTemplate.store(
                    image.getInputStream(),
                    image.getOriginalFilename(),
                    image.getContentType()
            );
            String fileId = objectId.toHexString();
            p.setImageId(fileId);
            p.setImageUrl("/api/images/" + fileId);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store image: " + e.getMessage(), e);
        }
    }

    private Map<String, User> loadSellers(List<Product> products) {
        Set<String> ids = products.stream()
                .map(Product::getSellerId)
                .filter(id -> id != null && !id.isBlank())
                .collect(Collectors.toSet());

        if (ids.isEmpty()) return Map.of();

        return userRepository.findAllById(ids).stream()
                .collect(Collectors.toMap(User::getId, Function.identity()));
    }

    private Query buildQuery(String q, String category, String region,
                             Double minPrice, Double maxPrice) {
        List<Criteria> criteria = new ArrayList<>();

        if (q != null && !q.isBlank()) {
            criteria.add(new Criteria().orOperator(
                    Criteria.where("title").regex(q, "i"),
                    Criteria.where("description").regex(q, "i")
            ));
        }
        if (category != null && !category.isBlank()) {
            // Support comma-separated values and case-insensitive match
            String[] cats = category.split(",");
            if (cats.length == 1) {
                criteria.add(Criteria.where("category").regex("^" + cats[0].trim() + "$", "i"));
            } else {
                List<Criteria> catOr = new ArrayList<>();
                for (String cat : cats) {
                    catOr.add(Criteria.where("category").regex("^" + cat.trim() + "$", "i"));
                }
                criteria.add(new Criteria().orOperator(catOr.toArray(new Criteria[0])));
            }
        }
        if (region != null && !region.isBlank()) {
            criteria.add(Criteria.where("region").regex("^" + region.trim() + "$", "i"));
        }
        if (minPrice != null) {
            criteria.add(Criteria.where("price").gte(minPrice));
        }
        if (maxPrice != null) {
            criteria.add(Criteria.where("price").lte(maxPrice));
        }

        Query query = new Query();
        if (!criteria.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[0])));
        }
        return query;
    }
}
