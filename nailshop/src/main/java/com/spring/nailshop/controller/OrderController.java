package com.spring.nailshop.controller;
import com.spring.nailshop.dto.request.OrderCancelRequest;
import com.spring.nailshop.dto.request.OrderRequest;
import com.spring.nailshop.dto.request.OrderUpdateRequest;
import com.spring.nailshop.dto.response.*;
import com.spring.nailshop.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/v1/order")
@Tag(name = "Order Controller")
@Slf4j
@Validated
public class OrderController {

    OrderService orderService;

    @PostMapping("/create")
    public ApiResponse<OrderCreateSuccess> createOrder(@RequestBody OrderRequest request) {
        return ApiResponse.<OrderCreateSuccess>builder()
                .code(HttpStatus.OK.value())
                .result(orderService.createOrder(request))
                .message("Created order successfully")
                .build();
    }
    @PutMapping("/cancel")
    public ApiResponse<Void> cancelOrder(@RequestBody OrderCancelRequest request) {
        orderService.cancelOrder(request.getId());
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Cancel order successfully")
                .build();
    }


    @GetMapping("/payment-info/{orderId}")
    public ApiResponse<OrderPaymentInfoResponse> createOrder(@PathVariable(value = "orderId") Long orderId) {
        return ApiResponse.<OrderPaymentInfoResponse>builder()
                .code(HttpStatus.OK.value())
                .result(orderService.getOrderPaymentInfo(orderId))
                .message("Get payment of order successfully")
                .build();
    }

    @GetMapping("/my-order")
    public ApiResponse<PageResponse<List<OrderResponse>>> getMyOrder(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createAt");
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        return ApiResponse.<PageResponse<List<OrderResponse>>>builder()
                .code(HttpStatus.OK.value())
                .result(orderService.getMyOrder( pageable))
                .message("Get all my order successfully")
                .build();
    }

}
