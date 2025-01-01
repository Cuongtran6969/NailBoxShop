package com.spring.nailshop.util;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum CouponType {
    FREE_SHIP("Miễn phí vận chuyển"),
    MONEY("Giảm tiền");

    private String name;

    private CouponType(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
