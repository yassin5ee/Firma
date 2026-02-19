package com.firma.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ProductPageResponse {
    private List<ProductResponse> items;
    private int page;
    private int size;
    private long total;
    private int totalPages;
}
