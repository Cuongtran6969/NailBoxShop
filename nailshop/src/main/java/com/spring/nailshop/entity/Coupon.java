package com.spring.nailshop.entity;

import com.spring.nailshop.util.CouponType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "coupons")
public class Coupon extends AbstractEntity<Long> {
    @Column(name = "code")
    private String code;

    @Column(name = "type", nullable = false)
    private CouponType type;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "startTime")
    private LocalDateTime startTime;

    @Column(name = "endTime")
    private LocalDateTime endTime;

    @Column(name = "is_used")
    private Boolean is_used;
}
