package com.spring.nailshop.controller.admin;

import com.spring.nailshop.dto.request.ProductUpdateRequest;
import com.spring.nailshop.dto.request.ShopBannersRequest;
import com.spring.nailshop.dto.request.ShopUpdateRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.dto.response.ShopResponse;
import com.spring.nailshop.service.ShopService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@Slf4j
@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/admin/shop")
@RequiredArgsConstructor
public class AdminShopController {

    ShopService shopService;

    @PutMapping("/update")
    public ApiResponse<Void> updateShop(@RequestBody ShopUpdateRequest request) {
        shopService.updateShop(request);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Update shop successfully")
                .build();
    }

    @PutMapping("/save-banner")
    public ApiResponse<String> updateProduct(
            @RequestPart(value = "banner", required = false) ShopBannersRequest banner,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        return ApiResponse.<String>builder()
                .result(shopService.updateBanner(banner, images))
                .code(HttpStatus.OK.value())
                .message("Save banner successfully")
                .build();
    }

    @GetMapping("/info")
    public ApiResponse<ShopResponse> getInfo() {
        return ApiResponse.<ShopResponse>builder()
                .result(shopService.getInfo())
                .code(HttpStatus.OK.value())
                .message("Get shop info successfully")
                .build();
    }
}
