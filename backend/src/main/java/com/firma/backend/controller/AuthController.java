package com.firma.backend.controller;

import com.firma.backend.dto.AuthResponse;
import com.firma.backend.dto.LoginRequest;
import com.firma.backend.dto.SignupRequest;
import com.firma.backend.dto.UserDto;
import com.firma.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /** POST /api/auth/signup */
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest req) {
        AuthResponse res = authService.signup(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    /** POST /api/auth/login */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        try {
            return ResponseEntity.ok(authService.login(req));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /** GET /api/auth/me — returns the authenticated user's profile */
    @GetMapping("/me")
    public ResponseEntity<UserDto> me(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String userId = (String) auth.getPrincipal();
        return ResponseEntity.ok(authService.getMe(userId));
    }
}
