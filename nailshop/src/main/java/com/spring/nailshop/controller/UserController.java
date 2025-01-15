package com.spring.nailshop.controller;


import com.spring.nailshop.dto.request.UserInfoUpdateRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.UserProfileResponse;
import com.spring.nailshop.dto.response.UserUpdateResponse;
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

    @GetMapping("/get-info")
    ApiResponse<UserProfileResponse> getUserProfile() {
        var result = userService.getInfoProfile();
        return ApiResponse.<UserProfileResponse>builder()
                .result(result)
                .message("Get profile successfully")
                .code(HttpStatus.OK.value())
                .build();
    }


    @PutMapping("/update-profile")
    public ApiResponse<UserUpdateResponse> updateProfile(
            @RequestPart("user") @Valid UserInfoUpdateRequest userUpdateRequest,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        return ApiResponse.<UserUpdateResponse>builder()
                .result(userService.updateUser(userUpdateRequest, file))
                .message("Update User Profile Successfully")
                .code(HttpStatus.CREATED.value())
                .build();
    }
}
