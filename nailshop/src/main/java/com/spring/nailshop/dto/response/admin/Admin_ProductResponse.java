package com.spring.nailshop.dto.response.admin;

import com.spring.nailshop.dto.response.CategoryResponse;
import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
    Integer sold;//
    Boolean isActive;
    String pictures;
    LocalDateTime createAt;
    Set<CategoryResponse> categories;
}
