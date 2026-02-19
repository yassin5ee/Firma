package com.firma.backend.dto;

import lombok.Data;

import java.time.Instant;

/** API response shape for a single product, with embedded seller info. */
@Data
public class ProductResponse {

    private String id;
    private String title;
    private String description;
    private String category;
    private double price;
    private String unit;
    private String imageId;
    private String imageUrl;
    private String address;
    private String region;
    private String sellerId;
    private SellerDto seller;
    private Instant createdAt;

    @Data
    public static class SellerDto {
        private String id;
        private String firstName;
        private String lastName;
        private String phone;
        private String email;
    }
}
