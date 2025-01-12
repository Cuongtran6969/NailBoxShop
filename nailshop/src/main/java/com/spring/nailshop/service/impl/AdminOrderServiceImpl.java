package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.OrderShipCodeRequest;
import com.spring.nailshop.dto.request.OrderUpdateRequest;
import com.spring.nailshop.dto.response.*;
import com.spring.nailshop.dto.response.admin.Admin_OrderResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Design;
import com.spring.nailshop.entity.Order;
import com.spring.nailshop.entity.OrderItem;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.OrderItemMapper;
import com.spring.nailshop.mapper.OrderMapper;
import com.spring.nailshop.mapper.ProductMapper;
import com.spring.nailshop.model.TimeRange;
import com.spring.nailshop.repository.OrderItemRepository;
import com.spring.nailshop.repository.OrderRepository;
import com.spring.nailshop.repository.ProductRepository;
import com.spring.nailshop.service.AdminOrderService;
import com.spring.nailshop.util.OrderStatus;
import com.spring.nailshop.util.TimeRangeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminOrderServiceImpl implements AdminOrderService {

    private final OrderRepository orderRepository;

    private final OrderMapper orderMapper;

    private final OrderItemRepository orderItemRepository;

    private final OrderItemMapper orderItemMapper;

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('ADMIN, STAFF')")
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
    @PreAuthorize("isAuthenticated() and hasAuthority('ADMIN, STAFF')")
    public void saveOrderShipCode(Long id, OrderShipCodeRequest request) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        order.setShip_code(request.getCode());
        orderRepository.save(order);
    }

    public List<OrderItemResponse> getOrderItemByOID(Long oid) {
        return orderItemRepository.findByOrderId(oid)
                .stream().map(orderItemMapper::toOrderItemResponse).toList();
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('ADMIN, STAFF')")
    public RevenueResponse getRevenueGrowth(String period) {
        TimeRange currentRange = TimeRangeUtil.getTimeRange(period);
        TimeRange previousRange = TimeRangeUtil.getPreviousTimeRange(period);

        BigDecimal currentRevenue = orderRepository.getRevenue(currentRange.getStartDate(), currentRange.getEndDate());
        BigDecimal previousRevenue = orderRepository.getRevenue(previousRange.getStartDate(), previousRange.getEndDate());

        currentRevenue = currentRevenue != null ? currentRevenue : BigDecimal.ZERO;
        previousRevenue = previousRevenue != null ? previousRevenue : BigDecimal.ZERO;


        List<RevenueData> currentListRevenue = orderRepository.findRevenueBetweenDates(currentRange.getStartDate(), currentRange.getEndDate());
        List<RevenueData> previousListRevenue = orderRepository.findRevenueBetweenDates(previousRange.getStartDate(), previousRange.getEndDate());


        List<Date> allDatesCurrent = getAllDatesInRange(currentRange.getStartDate(), currentRange.getEndDate());
        List<Date> allDatesPrevious = getAllDatesInRange(previousRange.getStartDate(), previousRange.getEndDate());


        currentListRevenue = fillMissingRevenueData(currentListRevenue, allDatesCurrent);
        previousListRevenue = fillMissingRevenueData(previousListRevenue, allDatesPrevious);

        return RevenueResponse.builder()
                .currentRevenue(currentRevenue)
                .previousRevenue(previousRevenue)
                .listRevenueData(currentListRevenue)
                .previousListRevenueData(previousListRevenue)
                .build();
    }

    private List<Date> getAllDatesInRange(LocalDateTime startDate, LocalDateTime endDate) {
        List<Date> allDates = new ArrayList<>();
        LocalDateTime currentDate = startDate;
        while (!currentDate.isAfter(endDate)) {
            allDates.add(java.sql.Date.valueOf(currentDate.toLocalDate()));
            currentDate = currentDate.plusDays(1);
        }
        return allDates;
    }

    // Hàm điền doanh thu cho các ngày không có doanh thu
    private List<RevenueData> fillMissingRevenueData(List<RevenueData> revenueList, List<Date> allDates) {
        Map<Date, Double> revenueMap = new HashMap<>();
        for (RevenueData revenueData : revenueList) {
            revenueMap.put(revenueData.getCreateAt(), revenueData.getRevenue());
        }

        List<RevenueData> resultList = new ArrayList<>();
        for (Date date : allDates) {
            Double revenue = revenueMap.getOrDefault(date, 0.0); // Nếu không có doanh thu, gán 0
            resultList.add(new RevenueData(date, revenue));
        }
        return resultList;
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('ADMIN, STAFF')")
    public OrderSummaryResponse getOrderSummary(String period) {
        log.info("get in"+period);
        TimeRange currentRange = TimeRangeUtil.getTimeRange(period);
        TimeRange previousRange = TimeRangeUtil.getPreviousTimeRange(period);

        List<Order> currentOrders = orderRepository.findOrdersByPeriod(currentRange.getStartDate(), currentRange.getEndDate());
        List<Order> previousOrders = orderRepository.findOrdersByPeriod(previousRange.getStartDate(), previousRange.getEndDate());
        Long currentNumber = 0L;
        Long beforeNumber = 0L;
        for (Order order : currentOrders) {
            currentNumber += calculateTotalQuantity(order.getOrderItems());
        }
        for (Order order : previousOrders) {
            beforeNumber += calculateTotalQuantity(order.getOrderItems());
        }
        return OrderSummaryResponse.builder()
                .currentOrder(currentNumber)
                .previousOrder(beforeNumber)
                .build();
    }

    public int calculateTotalQuantity(List<OrderItem> orderItems) {
        if (orderItems == null || orderItems.isEmpty()) {
            return 0;
        }
        return orderItems.stream()
                .mapToInt(OrderItem::getQuantity)
                .sum();
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('ADMIN, STAFF')")
    public List<Admin_ProductResponse> getTopProductSeller(String period) {
        TimeRange currentRange = TimeRangeUtil.getTimeRange(period);
        List<Admin_ProductResponse> list = new ArrayList<>();
        // Tạo Pageable với số lượng tối đa là 10
        int limit = 10;
        List<Object[]> results = orderItemRepository.findTopSellingProducts(currentRange.getStartDate(), currentRange.getEndDate(), limit);
        for (Object[] obj : results) {
            Long productId = (Long) obj[0];
            Integer totalQuantity = ((Number) obj[1]).intValue();
            Product product = productRepository.findById(productId).orElse(null);  // Lấy sản phẩm từ DB
            if (product != null) {
                Admin_ProductResponse response = productMapper.toAdminProductResponse(product);
                response.setSold(totalQuantity);
                list.add(response);
            }
        }
        return list;
    }

    @Override
    public void updateStatus(OrderUpdateRequest request) {
        Order order = orderRepository.findById(request.getId()).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        order.setStatus(request.getStatus());
        if(request.getStatus() == OrderStatus.PAYMENT_SUCCESS) {
            order.setPaymentAt(LocalDateTime.now());
        } else if(request.getStatus() == OrderStatus.CANCELLED) {
            order.setPaymentAt(LocalDateTime.now());
        } else if(request.getStatus() == OrderStatus.COMPLETED) {
            order.setCompleteAt(LocalDateTime.now());
        }
        orderRepository.save(order);
    }
}
