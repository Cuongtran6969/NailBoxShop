package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.OrderShipCodeRequest;
import com.spring.nailshop.dto.request.OrderUpdateRequest;
import com.spring.nailshop.dto.response.OrderSummaryResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.RevenueResponse;
import com.spring.nailshop.dto.response.admin.Admin_OrderResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface AdminOrderService {
    PageResponse<List<Admin_OrderResponse>> getAllOrder(Specification<Order> spec, Pageable pageable);

    void saveOrderShipCode(Long id, OrderShipCodeRequest request);

    RevenueResponse getRevenueGrowth(String period);

    OrderSummaryResponse getOrderSummary(String period);

    List<Admin_ProductResponse> getTopProductSeller(String period);

    void updateStatus(OrderUpdateRequest request);
}
