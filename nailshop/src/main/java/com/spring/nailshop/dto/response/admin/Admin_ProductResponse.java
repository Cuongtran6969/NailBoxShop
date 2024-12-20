package com.spring.nailshop.dto.response.admin;

import com.spring.nailshop.dto.response.CategoryResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Admin_ProductResponse {
    Long id;
    String name;
    BigDecimal price;
    Integer stock;
    Integer discount;
    Boolean isActive;
    String pictures;
    Set<CategoryResponse> categories;
}
