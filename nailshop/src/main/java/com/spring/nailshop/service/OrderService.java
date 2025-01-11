package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.OrderRequest;
import com.spring.nailshop.dto.request.OrderUpdateRequest;
import com.spring.nailshop.dto.response.*;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Order;
import com.spring.nailshop.repository.OrderRepository;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderService {
    OrderCreateSuccess createOrder(OrderRequest request);

    OrderInfoResponse getOrderToPaymentInfo(Long orderId);

    void savePaymentQr(Long orderId, String image);

    OrderPaymentInfoResponse getOrderPaymentInfo(Long orderId);

    List<Order> getOrdersByPeriod(String period);

    RevenueResponse getRevenueGrowth(String period);

    OrderSummaryResponse getOrderSummary(String period);

    List<Admin_ProductResponse> getTopProductSeller(String period);

    PageResponse<List<OrderResponse>> getMyOrder(Pageable pageable);

    void cancelOrder(Long orderId);

    void updateStatus(OrderUpdateRequest request);

}
