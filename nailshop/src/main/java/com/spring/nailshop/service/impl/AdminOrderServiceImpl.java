package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.admin.Admin_OrderResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Order;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.mapper.OrderMapper;
import com.spring.nailshop.repository.OrderRepository;
import com.spring.nailshop.service.AdminOrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminOrderServiceImpl implements AdminOrderService {

    private final OrderRepository orderRepository;

    private final OrderMapper orderMapper;

    @Override
    public PageResponse<List<Admin_OrderResponse>> getAllOrder(Specification<Order> spec, Pageable pageable) {
        Page<Order> orders = orderRepository.findAll(spec, pageable);

        List<Admin_OrderResponse> orderResponse = orders.getContent()
                .stream().map(orderMapper::toAdminOrderResponse)
                .toList();

        return PageResponse.<List<Admin_OrderResponse>>builder()
                .page(pageable.getPageNumber() + 1)
                .totalPages(orders.getTotalPages())
                .size(pageable.getPageSize())
                .total(orders.getTotalElements())
                .items(orderResponse)
                .build();
    }
}
