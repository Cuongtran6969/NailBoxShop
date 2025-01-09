package com.spring.nailshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RevenueResponse {
    BigDecimal currentRevenue;
    BigDecimal previousRevenue;
    List<RevenueData> listRevenueData;
    List<RevenueData> previousListRevenueData;
}
