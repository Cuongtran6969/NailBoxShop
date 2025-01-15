package com.spring.nailshop.dto.response;

import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Map;
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DashboardResponse {
 OrderSummaryResponse orderSummary;//
 RevenueResponse revenueResponse;//
 UserSummaryResponse userSummary;
 List<Admin_ProductResponse> bestProducts;
}
