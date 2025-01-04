package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.OrderShipCodeRequest;
import com.spring.nailshop.dto.response.OrderItemResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.admin.Admin_OrderResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Design;
import com.spring.nailshop.entity.Order;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.OrderItemMapper;
import com.spring.nailshop.mapper.OrderMapper;
import com.spring.nailshop.repository.OrderItemRepository;
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

    private final OrderItemRepository orderItemRepository;

    private final OrderItemMapper orderItemMapper;

    @Override
    public PageResponse<List<Admin_OrderResponse>> getAllOrder(Specification<Order> spec, Pageable pageable) {
        Page<Order> orders = orderRepository.findAll(spec, pageable);

        List<Admin_OrderResponse> orderResponse = orders.getContent()
                .stream().map(orderMapper::toAdminOrderResponse)
                .toList();

        for(Admin_OrderResponse order : orderResponse) {
            order.setItems(getOrderItemByOID(order.getId()));
        }
        return PageResponse.<List<Admin_OrderResponse>>builder()
                .page(pageable.getPageNumber() + 1)
                .totalPages(orders.getTotalPages())
                .size(pageable.getPageSize())
                .total(orders.getTotalElements())
                .items(orderResponse)
                .build();
    }

    @Override
    public void saveOrderShipCode(Long id, OrderShipCodeRequest request) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        order.setShip_code(request.getCode());
        orderRepository.save(order);
    }

    public List<OrderItemResponse> getOrderItemByOID(Long oid) {
        return orderItemRepository.findByOrderId(oid)
                .stream().map(orderItemMapper::toOrderItemResponse).toList();
    }
}
