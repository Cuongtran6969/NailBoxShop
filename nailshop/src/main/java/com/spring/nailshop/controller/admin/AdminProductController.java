package com.spring.nailshop.controller.admin;

import com.spring.nailshop.dto.request.ProductRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.service.AdminProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/admin/products")
@RequiredArgsConstructor
public class AdminProductController {

    private final AdminProductService adminProductService;

    @PostMapping("/create-product")
    public ApiResponse<ProductResponse> createProduct(
            @RequestPart("product") @Valid ProductRequest productRequest,
            @RequestPart(value = "productImages", required = false) List<MultipartFile> productImages,
            @RequestPart(value = "designImages", required = false) List<MultipartFile> designImages
            ) {
         return ApiResponse.<ProductResponse>builder()
                 .code(HttpStatus.CREATED.value())
                 .message("Add product successfully")
                 .result(adminProductService.createProduct(productRequest,productImages, designImages))
                 .build();
    }

    @PostMapping("/update-product")
    public ApiResponse<ProductResponse> updateProduct(
            @RequestPart("product") @Valid ProductRequest productRequest,
            @RequestPart(value = "productImages", required = false) List<MultipartFile> productImages,
            @RequestPart(value = "designImages", required = false) List<MultipartFile> designImages
    ) {
        return ApiResponse.<ProductResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Add product successfully")
                .result(adminProductService.createProduct(productRequest,productImages, designImages))
                .build();
    }

}
