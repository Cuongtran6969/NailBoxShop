package com.spring.nailshop.controller;

import com.spring.nailshop.dto.request.CategoryRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.CategoryResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.service.CategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/category")
@Tag(name = "User Controller")
@Slf4j
@Validated
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/create")
    public ApiResponse<Void> createCategory(@RequestBody @Valid CategoryRequest request) {
        categoryService.addCategories(request);
        ApiResponse<Void> apiResponse = new ApiResponse<>();
        apiResponse.setCode(HttpStatus.OK.value());
        apiResponse.setMessage("Create Category Successfully");
        return apiResponse;
    }

    @GetMapping("/list")
    public ApiResponse<List<CategoryResponse>> getAllCategory() {
        return ApiResponse.<List<CategoryResponse>>builder()
                .code(HttpStatus.OK.value())
                .result(categoryService.getAllCategories())
                .message("Get All Category Successfully")
                .build();
    }
}
