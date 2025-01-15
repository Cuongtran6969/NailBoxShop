package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.CouponCodeRequest;
import com.spring.nailshop.dto.request.CouponRequest;
import com.spring.nailshop.dto.response.CouponAvailableResponse;
import com.spring.nailshop.dto.response.CouponResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.entity.Coupon;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface CouponService {
    void createCoupon(CouponRequest request);

    CouponAvailableResponse getCouponByCode(String code);

    CouponResponse getRandomCouponForUser();

    PageResponse<List<CouponResponse>> getAllCoupon(Specification<Coupon> spec, Pageable pageable);

    void deleteCoupon(Long couponId);
}
