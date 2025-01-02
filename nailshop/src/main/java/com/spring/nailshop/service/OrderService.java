package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.OrderRequest;
import com.spring.nailshop.dto.response.OrderCreateSuccess;

public interface OrderService {
    OrderCreateSuccess createOrder(OrderRequest request);
}
