package com.spring.nailshop.service.impl;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.spring.nailshop.dto.request.CouponCodeRequest;
import com.spring.nailshop.dto.request.CouponRequest;
import com.spring.nailshop.dto.response.CouponResponse;
import com.spring.nailshop.entity.Coupon;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.repository.CouponRepository;
import com.spring.nailshop.service.CouponService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;

    @Override
    public void createCoupon(CouponRequest request) {
        List<Coupon> coupons = generateCoupons(request);
        couponRepository.saveAll(coupons);
    }

    @Override
    public void setUsedCoupon(Long id) {
        Coupon coupon = couponRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.COUPON_ID_INVALID));
        coupon.setIs_used(false);
        couponRepository.save(coupon);
    }

    @Override
    public CouponResponse getCouponByCode(CouponCodeRequest request) {
        Coupon coupon = couponRepository.findByCode(request.getCode())
                .orElseThrow(() -> new AppException(ErrorCode.COUPON_CODE_INVALID));

        if (coupon.getStartTime().isAfter(LocalDateTime.now()) ||
            coupon.getEndTime().isBefore(LocalDateTime.now()) ||
            coupon.getIs_used()) {
            throw new AppException(ErrorCode.COUPON_CODE_INVALID);
        }

        CouponResponse response = CouponResponse.builder()
                .type(coupon.getType())
                .amount(coupon.getAmount())
                .isAvailable(true) // Coupon hợp lệ
                .build();

        return response;
    }

    private List<Coupon> generateCoupons(CouponRequest request) {
        List<Coupon> coupons = new ArrayList<>();
        for (int i = 0; i < request.getNumber(); i++) {
            String code = generateCouponCode();
            Coupon coupon = Coupon.builder()
                    .code(code)
                    .type(request.getType())
                    .amount(request.getAmount())
                    .startTime(request.getStartTime())
                    .endTime(request.getEndTime())
                    .build();
            coupons.add(coupon);
        }
        return coupons;
    }

    public String generateCouponCode() {
        char[] alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();
        SecureRandom secureRandom = new SecureRandom();
        String couponCode = NanoIdUtils.randomNanoId(secureRandom, alphabet, 6);
        return couponCode;
    }

}
