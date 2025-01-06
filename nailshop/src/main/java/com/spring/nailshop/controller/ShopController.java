package com.spring.nailshop.controller;

import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.service.ShopService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ShopController {

    ShopService shopService;

    @GetMapping("/shop/banners")
    public ApiResponse<String> getBanners() {
        return ApiResponse.<String>builder()
                .result(shopService.getInfo().getBanners())
                .code(HttpStatus.OK.value())
                .message("Get banner successfully")
                .build();
    }

}
