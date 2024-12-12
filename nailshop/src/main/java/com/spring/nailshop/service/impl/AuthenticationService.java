package com.spring.nailshop.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.spring.nailshop.dto.request.AuthenticationRequest;
import com.spring.nailshop.dto.request.EmailRequest;
import com.spring.nailshop.dto.request.LogoutRequest;
import com.spring.nailshop.dto.request.RefreshTokenRequest;
import com.spring.nailshop.dto.response.TokenResponse;
import com.spring.nailshop.entity.Token;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.exception.InvalidTokenException;
import com.spring.nailshop.model.RedisToken;
import com.spring.nailshop.repository.UserRepository;
import com.spring.nailshop.security.UserSecurity;
import com.spring.nailshop.service.JwtService;
import com.spring.nailshop.service.JwtTokenService;
import com.spring.nailshop.service.RedisTokenService;
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

    RedisTokenService redisTokenService;

    private final AuthenticationManager authenticationManager;

    public TokenResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() ->
                new UsernameNotFoundException("Username or password incorrect"));

        UserSecurity userSecurity = new UserSecurity(user);
        var accessToken = jwtService.generateToken(userSecurity);
        var refreshToken = jwtService.generateRefreshToken(userSecurity);


        redisTokenService.save(RedisToken.builder()
                        .id(user.getEmail())
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                .build());

        return TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .build();
    }

    public TokenResponse refresh(RefreshTokenRequest request) {
        String refreshToken = request.getToken();
        if(StringUtils.isBlank(refreshToken)) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }
        final String userName = jwtService.extractUsername(refreshToken, TokenType.REFRESH_TOKEN);
        User user = userRepository.findByEmail(userName)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        UserSecurity userSecurity = new UserSecurity(user);

        if(!jwtService.isValid(refreshToken, TokenType.REFRESH_TOKEN, userSecurity)) {
            throw new InvalidTokenException();
        }
        String accessToken = jwtService.generateToken(userSecurity);
        redisTokenService.save(RedisToken.builder()
                .id(user.getEmail())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build());

        return TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .build();
    }

    public void logout(LogoutRequest request) {
        String logoutToken = request.getToken();
        if(StringUtils.isBlank(logoutToken)) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }
        final String userName = jwtService.extractUsername(logoutToken, TokenType.ACCESS_TOKEN);
        redisTokenService.remove(userName);
    }

    public String forgetPassword(HttpServletRequest request) {
        return null;
    }

    public String getOtp(EmailRequest request) {
        return redisTokenService.getById(request.getEmail()).getAccessToken();
    }
}
