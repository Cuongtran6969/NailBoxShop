package com.spring.nailshop.controller.admin;

import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.service.AdminUserService;
import com.spring.nailshop.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.query.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/admin/users")
@Tag(name = "Admin User Controller")
@Slf4j
@Validated
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    public ApiResponse<PageResponse<?>> getAllUsers( @RequestParam(defaultValue = "1") int page,
                                                     @RequestParam(defaultValue = "10") int size,
                                                     @RequestParam(required = false) String[] user,
                                                     @RequestParam(required = false) String[] address
    ) {
        ApiResponse<PageResponse<?>> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(page - 1, size);
        PageResponse pageResponse = adminUserService.advanceSearchWithSpecifications(pageable, user, address);
        apiResponse.setCode(HttpStatus.OK.value());
        apiResponse.setResult(pageResponse);
        apiResponse.setMessage("Get List Of User");
        return apiResponse;
    }
}
