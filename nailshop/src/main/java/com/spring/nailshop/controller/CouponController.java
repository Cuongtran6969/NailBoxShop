package com.spring.nailshop.controller;

import com.spring.nailshop.dto.request.CouponRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.CouponAvailableResponse;
import com.spring.nailshop.dto.response.CouponResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.entity.Coupon;
import com.spring.nailshop.service.CouponService;
import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
                .message("Get coupon by code successfully")
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> deleteCoupon(@PathVariable Long id) {
        couponService.deleteCoupon(id);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Delete coupon successfully")
                .build();
    }


    @GetMapping("/get-random")
    public ApiResponse<CouponResponse> getRandomCouponForUser() {
        return ApiResponse.<CouponResponse>builder()
                .code(HttpStatus.CREATED.value())
                .result(couponService.getRandomCouponForUser())
                .message("Coupon get random successfully")
                .build();
    }

    @GetMapping("/get-all")
    public ApiResponse<PageResponse<List<CouponResponse>>> getAllCoupon(
            @Filter Specification<Coupon> spec,
            @RequestParam(defaultValue = "createAt:desc") String[] sort,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page - 1, size, getSortOrder(sort));
        return ApiResponse.<PageResponse<List<CouponResponse>>>builder()
                .code(HttpStatus.OK.value())
                .result(couponService.getAllCoupon(spec, pageable))
                .message("Coupon get all successfully")
                .build();
    }

    private Sort getSortOrder(String[] sort) {
        List<Sort.Order> orders = new ArrayList<>();
        for (String s : sort) {
            String[] sortDetails = s.split(":");
            String sortBy = sortDetails[0];
            String sortDir = sortDetails.length > 1 ? sortDetails[1] : "asc";
            log.info("sortBy: {}, sortDir: {}", sortBy, sortDir);

            Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
            orders.add(new Sort.Order(direction, sortBy));
        }
        return Sort.by(orders);
    }
}
