package com.spring.nailshop.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductUpdateRequest {
    Long id;
    String name;
    BigDecimal price;
    Integer stock;
    String description;
    Integer discount;
    Boolean isActive;
    String size;
    Set<String> oldImages;
    Set<Long> categoryIds;
}
