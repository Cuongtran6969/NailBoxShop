package com.spring.nailshop.dto.response;

import com.spring.nailshop.dto.request.DesignRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    Long id;
    String name;
    BigDecimal price;
    Integer stock;
    String description;
    Integer discount;
    Boolean isActive;
    String pictures;
    Integer sold;
    Set<DesignResponse> designs;
    Set<CategoryResponse> categories;
}
