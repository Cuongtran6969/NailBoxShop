package com.spring.nailshop.dto.request;

import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductRequest {
    String name;
    BigDecimal price;
    Integer stock;
    String description;
    Integer discount;
    Boolean isActive;
    Set<DesignRequest> designs;
    Set<Long> categoryIds;
}
