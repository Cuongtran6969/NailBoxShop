package com.spring.nailshop.service;

import org.springframework.security.core.userdetails.UserDetails;
public interface JwtService {
    String generateToken(UserDetails user);

    String generateRefreshToken(UserDetails userDetails);
}
