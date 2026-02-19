package com.firma.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

/** Uniform error response body returned by GlobalExceptionHandler. */
@Data
@AllArgsConstructor
public class ApiError {
    private int status;
    private String error;
    private String message;
    private Instant timestamp;
}
