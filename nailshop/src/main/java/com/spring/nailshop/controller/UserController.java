package com.spring.nailshop.controller;

import com.spring.nailshop.dto.request.EmailRequest;
import com.spring.nailshop.dto.request.UserCreationRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/user")
@Tag(name = "User Controller")
@Slf4j
@Validated
public class UserController {

    UserService userService;

    @GetMapping("/list")
    public ApiResponse<List<UserResponse>> getUsers() {
       ApiResponse<List<UserResponse>> apiResponse = new ApiResponse<>();
       apiResponse.setCode(100);
       apiResponse.setResult(userService.getAllUsers());
       return apiResponse;
    }
    @PostMapping("/register")
    public ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request,
                                                @RequestParam String otp) {
        var result = userService.createUser(request, otp);
        return ApiResponse.<UserResponse>builder()
                .result(result)
                .code(HttpStatus.CREATED.value())
                .build();
    }

    @PostMapping("/send-otp-register")
    public ApiResponse<Void> sendOtpRegister(@RequestBody EmailRequest request)
            throws MessagingException, UnsupportedEncodingException {
        userService.sendOtpRegister(request);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Send Otp Successfully")
                .build();
    }
}
