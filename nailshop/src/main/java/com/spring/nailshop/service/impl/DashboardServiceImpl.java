package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.response.DashboardResponse;
import com.spring.nailshop.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final OrderService orderService;

    private final AdminUserService adminUserService;

    private final ShopService shopService;

    private final UserService userService;

    @Override
    public DashboardResponse getDashboardResponse(String period) {
        return DashboardResponse.builder()
                .revenueResponse(orderService.getRevenueGrowth(period))
                .orderSummary(orderService.getOrderSummary(period))
                .userSummary(adminUserService.getUserSummary(period))
                .bestProducts(orderService.getTopProductSeller(period))
                .build();
    }
}
