package com.firma.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

/** Safe public representation of a User — never exposes passwordHash. */
@Data
@AllArgsConstructor
public class UserDto {
    private String id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private Instant createdAt;
}
