package com.spring.nailshop.dto.response;

import java.math.BigDecimal;
import java.util.Set;

public class ProductDetailResponse {
    Long id;
    String name;
    BigDecimal price;
    Integer stock;
    Integer discount;
    Boolean isActive;
    String pictures;
    Set<CategoryResponse> categories;
}
