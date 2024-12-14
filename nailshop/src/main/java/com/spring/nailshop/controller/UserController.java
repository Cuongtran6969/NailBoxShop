package com.spring.nailshop.controller;


import com.spring.nailshop.dto.request.UserUpdateRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.dto.response.UserUpdateResponse;
import com.spring.nailshop.service.CloudinaryService;
import com.spring.nailshop.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/users")
@Tag(name = "User Controller")
@Slf4j
@Validated
public class UserController {

    UserService userService;

    CloudinaryService cloudinaryService;

    @GetMapping("/info/{userId}")
    public ApiResponse<UserResponse> getUserInfo(@PathVariable Long userId) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setCode(HttpStatus.OK.value());
        apiResponse.setResult(userService.getUserInfo(userId));
        return apiResponse;
    }

    @PutMapping("/update-profile")
    public ApiResponse<UserUpdateResponse> updateProfile(
            @RequestPart("user") @Valid UserUpdateRequest userUpdateRequest,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        return ApiResponse.<UserUpdateResponse>builder()
                .result(userService.updateUser(userUpdateRequest, file))
                .message("Update User Profile Successfully")
                .code(HttpStatus.CREATED.value())
                .build();
    }


}
