package com.spring.nailshop.controller;

import com.spring.nailshop.dto.request.CouponCodeRequest;
import com.spring.nailshop.dto.request.CouponRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.CouponAvailableResponse;
import com.spring.nailshop.dto.response.CouponResponse;
import com.spring.nailshop.service.CouponService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/v1/coupon")
@Tag(name = "Coupon Controller")
@Slf4j
@Validated
public class CouponController {

    CouponService couponService;

    @PostMapping("/create")
    public ApiResponse<Void> createCoupon(@RequestBody CouponRequest request) {
        couponService.createCoupon(request);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.CREATED.value())
                .message("Coupon created successfully")
                .build();
    }

    @GetMapping("/code/{value}")
    public ApiResponse<CouponAvailableResponse> getCouponByCode(@PathVariable String value) {
        return ApiResponse.<CouponAvailableResponse>builder()
                .code(HttpStatus.CREATED.value())
                .result(couponService.getCouponByCode(value))
                .message("Coupon created successfully")
                .build();
    }

    @GetMapping("/get-random")
    public ApiResponse<CouponResponse> getRandomCouponForUser() {
        return ApiResponse.<CouponResponse>builder()
                .code(HttpStatus.CREATED.value())
                .result(couponService.getRandomCouponForUser())
                .message("Coupon created successfully")
                .build();
    }
}
