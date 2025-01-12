package com.spring.nailshop.controller.admin;

import com.spring.nailshop.dto.request.OrderShipCodeRequest;
import com.spring.nailshop.dto.request.OrderUpdateRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.admin.Admin_OrderResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Order;
import com.spring.nailshop.service.AdminOrderService;
import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/admin/orders")
@Tag(name = "Order Controller")
@Slf4j
@Validated
public class AdminOrderController {

    AdminOrderService adminOrderService;

    @GetMapping("")
    public ApiResponse<PageResponse<List<Admin_OrderResponse>>> getOrders(
            @Filter Specification<Order> spec,
            @RequestParam(defaultValue = "createAt:desc") String[] sort,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page - 1, size, getSortOrder(sort));
        return ApiResponse.<PageResponse<List<Admin_OrderResponse>>>builder()
                .code(HttpStatus.OK.value())
                .result(adminOrderService.getAllOrder(spec, pageable))
                .build();
    }

    @PutMapping("/{orderId}/update/ship-code")
    public ApiResponse<Void> saveShipCode(@PathVariable(value = "orderId") Long orderId,
                                          @RequestBody OrderShipCodeRequest request ) {
        adminOrderService.saveOrderShipCode(orderId, request);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Save ship code successfully")
                .build();
    }

    @PutMapping("/{orderId}/cancel")
    public ApiResponse<Void> saveShipCode(@PathVariable(value = "orderId") Long orderId) {
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Save ship code successfully")
                .build();
    }

    @PutMapping("/update-status")
    public ApiResponse<Void> updateStatus(@RequestBody OrderUpdateRequest request) {
        adminOrderService.updateStatus(request);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Update order status successfully")
                .build();
    }

    private Sort getSortOrder(String[] sort) {
        List<Sort.Order> orders = new ArrayList<>();
        for (String s : sort) {
            String[] sortDetails = s.split(":");
            String sortBy = sortDetails[0];
            String sortDir = sortDetails.length > 1 ? sortDetails[1] : "asc";
            log.info("sortBy: {}, sortDir: {}", sortBy, sortDir);

            Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
            orders.add(new Sort.Order(direction, sortBy));
        }
        return Sort.by(orders);
    }
}
