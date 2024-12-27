package com.spring.nailshop.dto.response;

import com.spring.nailshop.entity.Product;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CampaignResponse {
    Long id;
    String name;
    String description;
    LocalDateTime startTime;
    LocalDateTime endTime;
    Boolean status;
    Integer numberProduct;
}
