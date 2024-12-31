package com.spring.nailshop.util;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum CouponType {
    FREE_SHIP("Miễn phí vận chuyển"),
    MONEY("Giảm tiền");
    private String type;

    private CouponType(String type) {
        this.type = type;
    }
    public String getType() {
        return type;
    }
}
