package com.spring.nailshop.controller;

import com.spring.nailshop.dto.request.OrderRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.OrderCreateSuccess;
import com.spring.nailshop.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
