package com.firma.backend.service;

import com.firma.backend.dto.ProductResponse;
import com.firma.backend.model.Product;
import com.firma.backend.model.User;

/**
 * Stateless mapping helpers — keep controllers thin.
 */
public final class ProductMapper {

    private ProductMapper() {}

    public static ProductResponse toResponse(Product p, User seller) {
        ProductResponse r = new ProductResponse();
        r.setId(p.getId());
        r.setTitle(p.getTitle());
        r.setDescription(p.getDescription());
        r.setCategory(p.getCategory());
        r.setPrice(p.getPrice());
        r.setUnit(p.getUnit());
        r.setImageId(p.getImageId());
        r.setImageUrl(p.getImageUrl());
        r.setAddress(p.getAddress());
        r.setRegion(p.getRegion());
        r.setSellerId(p.getSellerId());
        r.setCreatedAt(p.getCreatedAt());

        if (seller != null) {
            ProductResponse.SellerDto s = new ProductResponse.SellerDto();
            s.setId(seller.getId());
            s.setFirstName(seller.getFirstName());
            s.setLastName(seller.getLastName());
            s.setPhone(seller.getPhone());
            s.setEmail(seller.getEmail());
            r.setSeller(s);
        }

        return r;
    }
}
