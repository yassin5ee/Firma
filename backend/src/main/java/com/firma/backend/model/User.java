package com.firma.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id;

    private String firstName;
    private String lastName;
    private String phone;

    @Indexed(unique = true)
    private String email;

    /** BCrypt-hashed password — never serialized to JSON responses */
    private String passwordHash;

    @Builder.Default
    private List<String> roles = List.of("USER");

    @Builder.Default
    private Instant createdAt = Instant.now();
}
