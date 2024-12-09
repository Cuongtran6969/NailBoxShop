package com.spring.nailshop.service;

import com.spring.nailshop.util.TokenType;
import org.springframework.security.core.userdetails.UserDetails;
public interface JwtService {
    String generateToken(UserDetails user);

    String generateRefreshToken(UserDetails userDetails);

    String extractUsername(String token, TokenType type);

    boolean isValid(String token, TokenType type, UserDetails user);
}
