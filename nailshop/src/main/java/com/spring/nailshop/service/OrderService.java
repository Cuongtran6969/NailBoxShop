package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.OrderRequest;
import com.spring.nailshop.dto.response.OrderCreateSuccess;
import com.spring.nailshop.dto.response.OrderInfoResponse;
import com.spring.nailshop.dto.response.OrderPaymentInfoResponse;

public interface OrderService {
    OrderCreateSuccess createOrder(OrderRequest request);

    OrderInfoResponse getOrderToPaymentInfo(Long orderId);

    void savePaymentQr(Long orderId, String image);

    OrderPaymentInfoResponse getOrderPaymentInfo(Long orderId);
}
