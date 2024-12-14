package com.spring.nailshop.util;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum ProductForm {
    @JsonProperty("Tròn nhọn")
    TRON_NHON,
    @JsonProperty("Free size")
    FREE_SIZE,
    @JsonProperty("Nhọn")
    NHON,
    @JsonProperty("Thang")
    THANG,
    @JsonProperty("Tròn")
    TRON,
    @JsonProperty("Vuông")
    VUONG;
}
