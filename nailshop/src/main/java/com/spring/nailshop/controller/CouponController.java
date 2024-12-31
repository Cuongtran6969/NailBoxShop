package com.spring.nailshop.controller;

import com.spring.nailshop.dto.request.CouponCodeRequest;
import com.spring.nailshop.dto.request.CouponRequest;
import com.spring.nailshop.dto.response.ApiResponse;
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
@RequestMapping("/coupon")
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

    @GetMapping("/code")
    public ApiResponse<CouponResponse> getCouponByCode(CouponCodeRequest request) {
        return ApiResponse.<CouponResponse>builder()
                .code(HttpStatus.CREATED.value())
                .result(couponService.getCouponByCode(request))
                .message("Coupon created successfully")
                .build();
    }

    @PutMapping("/update_used/{id}")
    public ApiResponse<Void> setUsedCoupon(@PathVariable Long id) {
        couponService.setUsedCoupon(id);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.CREATED.value())
                .message("Update used successfully")
                .build();
    }
}
