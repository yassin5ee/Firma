package com.firma.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    private String id;

    private String title;
    private String description;
    private String category;
    private double price;
    private String unit;

    /** GridFS ObjectId as hex string — used internally */
    private String imageId;

    /** Public URL served via /api/images/{imageId} */
    private String imageUrl;

    private String address;
    private String region;

    /** MongoDB id of the User who created this listing */
    private String sellerId;

    @Builder.Default
    private Instant createdAt = Instant.now();
}
