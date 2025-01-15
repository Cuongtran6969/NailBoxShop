package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.response.DashboardResponse;
import com.spring.nailshop.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final AdminOrderService adminOrderService;

    private final AdminUserService adminUserService;

    private final ShopService shopService;

    private final UserService userService;

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public DashboardResponse getDashboardResponse(String period) {
        return DashboardResponse.builder()
                .revenueResponse(adminOrderService.getRevenueGrowth(period))
                .orderSummary(adminOrderService.getOrderSummary(period))
                .userSummary(adminUserService.getUserSummary(period))
                .bestProducts(adminOrderService.getTopProductSeller(period))
                .build();
    }
}
