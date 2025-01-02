package com.spring.nailshop.service.impl;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.spring.nailshop.dto.request.CouponCodeRequest;
import com.spring.nailshop.dto.request.CouponRequest;
import com.spring.nailshop.dto.response.CouponAvailableResponse;
import com.spring.nailshop.dto.response.CouponResponse;
import com.spring.nailshop.entity.Coupon;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.repository.CouponRepository;
import com.spring.nailshop.service.CouponService;
import com.spring.nailshop.util.CouponType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
    public CouponAvailableResponse getCouponByCode(String code) {
        Coupon coupon = couponRepository.findByCodeToUse(code)
                .orElseThrow(() -> new AppException(ErrorCode.COUPON_CODE_INVALID));

        CouponAvailableResponse response = CouponAvailableResponse.builder()
                .id(coupon.getId())
                .code(coupon.getCode())
                .type(coupon.getType().getName())
                .amount(coupon.getAmount())
                .isAvailable(true) // Coupon hợp lệ
                .build();

        return response;
    }

    @Override
    public CouponResponse getRandomCouponForUser() {
        //random display opportunity 20% for a user
        int randomValue = new Random().nextInt(100);
        if (randomValue >= 20) {
            return null;
        }
        Coupon coupon = couponRepository.findRandomValidCoupon()
                .orElseThrow(() -> new AppException(ErrorCode.NO_COUPONS_AVAILABLE));
        return CouponResponse.builder()
                .id(coupon.getId())
                .code(coupon.getCode())
                .type(coupon.getType().getName())
                .startTime(coupon.getStartTime())
                .endTime(coupon.getEndTime())
                .amount(coupon.getAmount())
                .build();
    }

    private List<Coupon> generateCoupons(CouponRequest request) {
        List<Coupon> coupons = new ArrayList<>();
        double amount = request.getAmount();
        if(request.getType().equals(CouponType.FREE_SHIP)) {
            amount =  0;
        }
        for (int i = 0; i < request.getNumber(); i++) {
            String code = generateUniqueCouponCode();
            Coupon coupon = Coupon.builder()
                    .code(code)
                    .type(request.getType())
                    .amount(amount)
                    .startTime(request.getStartTime())
                    .endTime(request.getEndTime())
                    .is_used(false)
                    .build();
            coupons.add(coupon);
        }
        return coupons;
    }


    public boolean isCodeUnique(String code) {
        return couponRepository.findByCode(code).isEmpty();
    }

    public String generateUniqueCouponCode() {
        String code;
        do {
            code = generateCouponCode();
        } while (!isCodeUnique(code));
        return code;
    }

    public String generateCouponCode() {
        char[] alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();
        SecureRandom secureRandom = new SecureRandom();
        String couponCode = NanoIdUtils.randomNanoId(secureRandom, alphabet, 6);
        return couponCode;
    }

}
