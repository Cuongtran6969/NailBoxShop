package com.spring.nailshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CampaignDetailResponse {
    String name;
    String description;
    LocalDateTime startTime;
    LocalDateTime endTime;
    Boolean status;
    List<ProductResponse> products;
}
