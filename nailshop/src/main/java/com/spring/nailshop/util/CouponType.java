package com.spring.nailshop.util;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum CouponType {
    FREE_SHIP("Miễn phí vận chuyển"),
    DISCOUNT("Giảm giá");

    private String name;

    private CouponType(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
