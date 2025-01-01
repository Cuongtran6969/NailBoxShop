package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.CouponCodeRequest;
import com.spring.nailshop.dto.request.CouponRequest;
import com.spring.nailshop.dto.response.CouponAvailableResponse;
import com.spring.nailshop.dto.response.CouponResponse;

public interface CouponService {
    void createCoupon(CouponRequest request);

    CouponAvailableResponse getCouponByCode(CouponCodeRequest request);

    CouponResponse getRandomCouponForUser();
}
