package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.AuthenticationRequest;
import com.spring.nailshop.dto.response.TokenResponse;
import com.spring.nailshop.entity.Token;
import com.spring.nailshop.repository.UserRepository;
import com.spring.nailshop.security.AuthUser;
import com.spring.nailshop.service.JwtService;
import com.spring.nailshop.service.JwtTokenService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;

    PasswordEncoder passwordEncoder;

    JwtService jwtService;

    JwtTokenService jwtTokenService;

    private final AuthenticationManager authenticationManager;

    public TokenResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() ->
                new UsernameNotFoundException("Username or password incorrect"));

        AuthUser authUser = new AuthUser(user);
        var accessToken = jwtService.generateToken(authUser);
        var refreshToken = jwtService.generateRefreshToken(authUser);


        jwtTokenService.save(Token.builder()
                        .user(user)
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                .build());

        return TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .build();
    }
    public TokenResponse refresh(HttpServletRequest request) {
        return null;
    }

    public String logout(HttpServletRequest request) {
        return null;
    }

    public String forgetPassword(HttpServletRequest request) {
        return null;
    }
}
