package com.spring.nailshop.controller;

import com.spring.nailshop.dto.request.AuthenticationRequest;
import com.spring.nailshop.dto.request.LogoutRequest;
import com.spring.nailshop.dto.request.RefreshTokenRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.TokenResponse;
import com.spring.nailshop.service.UserService;
import com.spring.nailshop.service.impl.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/auth")
@Tag(name = "Auth Controller")
@Slf4j
public class AuthenticationController {

    AuthenticationService authenticationService;

    @PostMapping("/login")
    public ApiResponse<TokenResponse> login(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.authenticate(request);
        return ApiResponse.<TokenResponse>builder()
                .code(HttpStatus.OK.value())
                .result(result)
                .build();
    }
    @PostMapping("/refresh")
    public ApiResponse<TokenResponse> refresh(@RequestBody RefreshTokenRequest request) {
        var result = authenticationService.refresh(request);
        return ApiResponse.<TokenResponse>builder()
                .code(HttpStatus.OK.value())
                .result(result)
                .build();
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(@RequestBody LogoutRequest request) {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Logout Successfully")
                .build();
    }
}
