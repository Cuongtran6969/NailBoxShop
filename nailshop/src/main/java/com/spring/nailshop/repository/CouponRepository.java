package com.spring.nailshop.repository;

import com.spring.nailshop.entity.Coupon;
import com.spring.nailshop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Long>, JpaSpecificationExecutor<Coupon> {
    Optional<Coupon> findByCode(String code);

    @Query(value = "SELECT * FROM coupons c WHERE c.code = :code AND c.start_time <= NOW() AND c.end_time >= NOW() AND c.is_used = false", nativeQuery = true)
    Optional<Coupon> findByCodeToUse(@Param("code") String code);

    @Query(value = "SELECT * FROM coupons WHERE start_time <= NOW() AND end_time >= NOW() AND is_used = false ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Optional<Coupon> findRandomValidCoupon();
}
