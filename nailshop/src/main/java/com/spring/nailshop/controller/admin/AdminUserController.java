package com.spring.nailshop.controller.admin;

import com.spring.nailshop.dto.request.ProductStatusRequest;
import com.spring.nailshop.dto.response.*;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.service.AdminUserService;
import com.spring.nailshop.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/admin/users")
@Tag(name = "Admin User Controller")
@Slf4j
@Validated
public class AdminUserController {

    private final AdminUserService adminUserService;

//    @GetMapping
//    public ApiResponse<PageResponse<?>> getAllUsers( @RequestParam(defaultValue = "1") int page,
//                                                     @RequestParam(defaultValue = "10") int size,
//                                                     @RequestParam(required = false) String[] user,
//                                                     @RequestParam(required = false) String[] address
//    ) {
//        ApiResponse<PageResponse<?>> apiResponse = new ApiResponse<>();
//        Pageable pageable = PageRequest.of(page - 1, size);
//        PageResponse pageResponse = adminUserService.advanceSearchWithSpecifications(pageable, user, address);
//        apiResponse.setCode(HttpStatus.OK.value());
//        apiResponse.setResult(pageResponse);
//        apiResponse.setMessage("Get List Of User");
//        return apiResponse;
//    }

   @GetMapping("/search")
    public ApiResponse<PageResponse<List<UserResponse>>> getAllUsers(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page - 1, size);
       return ApiResponse.<PageResponse<List<UserResponse>>>builder()
               .code(HttpStatus.CREATED.value())
               .result(adminUserService.searchUser(pageable, keyword))
               .message("Create design for product successfully")
               .build();
    }


    @PutMapping("/ban/{userId}")
    public ResponseEntity<String> banUser(
            @PathVariable Long userId
    ) {
        adminUserService.banUser(userId);
        return ResponseEntity.ok("User banned successfully");
    }

    @PutMapping("/unban/{userId}")
    public ResponseEntity<String> unbanUser(
            @PathVariable Long userId
    ) {
        adminUserService.unBanUser(userId);
        return ResponseEntity.ok("User unbanned successfully");
    }

    @GetMapping("/info/{userId}")
    public ApiResponse<UserResponse> getUserInfo(@PathVariable Long userId) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setCode(HttpStatus.OK.value());
        apiResponse.setResult(adminUserService.getUserInfo(userId));
        return apiResponse;
    }

}
