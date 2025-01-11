package com.spring.nailshop.dto.response;


import com.spring.nailshop.util.OrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    private Long id;
    private String code;
    private String ship_code;
    private String receiverName;
    private String phone;
    private Double totalPrice;
    private Integer shipFee;
    private OrderStatus status;
    private CouponResponse coupon;
    private List<OrderItemResponse> items;
    private PaymentResponse payment;
    private LocalDateTime createAt;
    private LocalDateTime paymentAt;
    private LocalDateTime cancelAt;
    private LocalDateTime completeAt;
}
