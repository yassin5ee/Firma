package com.firma.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-seconds}")
    private long expirationSeconds;

    private Key signingKey;

    @PostConstruct
    public void init() {
        try {
            byte[] keyBytes;
            try {
                keyBytes = java.util.Base64.getDecoder().decode(jwtSecret);
            } catch (IllegalArgumentException e) {
                keyBytes = jwtSecret.getBytes();
            }
            if (keyBytes.length * 8 < 256) {
                log.warn("JWT secret too short — generating ephemeral key (development only).");
                signingKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
            } else {
                signingKey = Keys.hmacShaKeyFor(keyBytes);
            }
        } catch (Exception e) {
            log.error("JWT key init failed, using ephemeral key.", e);
            signingKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        }
    }

    public String generateToken(String userId, String email, List<String> roles) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationSeconds * 1_000L);

        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .addClaims(Map.of("email", email, "roles", roles))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Parses and validates the token, throwing {@link JwtException} on failure.
     */
    public Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
