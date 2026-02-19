package com.firma.backend.controller;

import com.firma.backend.dto.ProductPageResponse;
import com.firma.backend.dto.ProductRequest;
import com.firma.backend.dto.ProductResponse;
import com.firma.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // ── GET /api/products ─────────────────────────────────────────────────────
    @GetMapping
    public ResponseEntity<ProductPageResponse> list(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size) {

        return ResponseEntity.ok(
                productService.list(q, category, region, minPrice, maxPrice, page, size));
    }

    // ── GET /api/products/{id} ────────────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable String id) {
        return ResponseEntity.ok(productService.getById(id));
    }

    // ── POST /api/products  (multipart) ───────────────────────────────────────
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> create(
            @RequestPart("title") String title,
            @RequestPart(value = "description", required = false) String description,
            @RequestPart(value = "category")  String category,
            @RequestPart(value = "price")     String price,
            @RequestPart(value = "unit",      required = false) String unit,
            @RequestPart(value = "address",   required = false) String address,
            @RequestPart(value = "region",    required = false) String region,
            @RequestPart(value = "image",     required = false) MultipartFile image,
            Authentication auth) {

        ProductRequest req = new ProductRequest();
        req.setTitle(title);
        req.setDescription(description);
        req.setCategory(category);
        req.setPrice(parsePrice(price));
        req.setUnit(unit);
        req.setAddress(address);
        req.setRegion(region);

        String sellerId = (String) auth.getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.create(req, image, sellerId));
    }

    // ── PUT /api/products/{id}  (multipart) ───────────────────────────────────
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> update(
            @PathVariable String id,
            @RequestPart("title") String title,
            @RequestPart(value = "description", required = false) String description,
            @RequestPart(value = "category")  String category,
            @RequestPart(value = "price")     String price,
            @RequestPart(value = "unit",      required = false) String unit,
            @RequestPart(value = "address",   required = false) String address,
            @RequestPart(value = "region",    required = false) String region,
            @RequestPart(value = "image",     required = false) MultipartFile image,
            Authentication auth) {

        ProductRequest req = new ProductRequest();
        req.setTitle(title);
        req.setDescription(description);
        req.setCategory(category);
        req.setPrice(parsePrice(price));
        req.setUnit(unit);
        req.setAddress(address);
        req.setRegion(region);

        String requesterId = (String) auth.getPrincipal();
        return ResponseEntity.ok(productService.update(id, req, image, requesterId));
    }

    // ── DELETE /api/products/{id} ─────────────────────────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id, Authentication auth) {
        String requesterId = (String) auth.getPrincipal();
        productService.delete(id, requesterId);
        return ResponseEntity.noContent().build();
    }

    // ── helpers ───────────────────────────────────────────────────────────────

    private double parsePrice(String price) {
        try {
            return Double.parseDouble(price);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid price value: " + price);
        }
    }
}
