package com.firma.backend.service;

import com.firma.backend.dto.AuthResponse;
import com.firma.backend.dto.LoginRequest;
import com.firma.backend.dto.SignupRequest;
import com.firma.backend.dto.UserDto;
import com.firma.backend.exception.ConflictException;
import com.firma.backend.exception.NotFoundException;
import com.firma.backend.model.User;
import com.firma.backend.repository.UserRepository;
import com.firma.backend.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthResponse signup(SignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new ConflictException("Email already in use");
        }

        User user = User.builder()
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .phone(req.getPhone())
                .email(req.getEmail())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .build();

        User saved = userRepository.save(user);
        String token = jwtUtils.generateToken(saved.getId(), saved.getEmail(), saved.getRoles());
        return new AuthResponse(token, toDto(saved));
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String token = jwtUtils.generateToken(user.getId(), user.getEmail(), user.getRoles());
        return new AuthResponse(token, toDto(user));
    }

    public UserDto getMe(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        return toDto(user);
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    public static UserDto toDto(User u) {
        return new UserDto(u.getId(), u.getFirstName(), u.getLastName(),
                u.getPhone(), u.getEmail(), u.getCreatedAt());
    }
}
