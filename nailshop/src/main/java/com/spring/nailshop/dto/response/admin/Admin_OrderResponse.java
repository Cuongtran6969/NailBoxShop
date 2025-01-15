package com.spring.nailshop.dto.response.admin;

import com.spring.nailshop.dto.response.CouponResponse;
import com.spring.nailshop.dto.response.OrderItemResponse;
import com.spring.nailshop.dto.response.PaymentResponse;
import com.spring.nailshop.entity.OrderItem;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Admin_OrderResponse {
    Long id;
    Long user_id;
    String code;
    String ship_code;
    String province_name;
    String district_name;
    String ward_name;
    String detail;
    String receiverName;
    String phone;
    String status;
    Integer shipFee;
    Integer quantity;
    LocalDateTime createAt;
    LocalDateTime paymentAt;
    LocalDateTime cancelAt;
    LocalDateTime completeAt;
    Double totalPrice;
    CouponResponse coupon;
    PaymentResponse payment;
    List<OrderItemResponse> items;
}
