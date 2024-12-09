package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.AuthenticationRequest;
import com.spring.nailshop.dto.response.TokenResponse;
import com.spring.nailshop.entity.Token;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.repository.UserRepository;
import com.spring.nailshop.security.UserSecurity;
import com.spring.nailshop.service.JwtService;
import com.spring.nailshop.service.JwtTokenService;
import com.spring.nailshop.util.TokenType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

        UserSecurity userSecurity = new UserSecurity(user);
        var accessToken = jwtService.generateToken(userSecurity);
        var refreshToken = jwtService.generateRefreshToken(userSecurity);


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
        String refreshToken = request.getHeader("x-token");
        if(StringUtils.isBlank(refreshToken)) {
            System.out.println("Refresh token is empty");
            //throw ex
        }
        final String userName = jwtService.extractUsername(refreshToken, TokenType.REFRESH_TOKEN);
        Optional<User> user = userRepository.findByEmail(userName);
        UserSecurity userSecurity = new UserSecurity(user.get());
        if(!jwtService.isValid(refreshToken, TokenType.REFRESH_TOKEN, userSecurity)) {
            System.out.println("Refresh invalid");
            //throw ex
        }
        String accessToken = jwtService.generateToken(userSecurity);

        return TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userId(user.get().getId())
                .build();
    }

    public String logout(HttpServletRequest request) {
        return null;
    }

    public String forgetPassword(HttpServletRequest request) {
        return null;
    }
}
