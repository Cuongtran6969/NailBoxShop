package com.spring.nailshop.dto.response.admin;

import com.spring.nailshop.dto.response.CouponResponse;
import com.spring.nailshop.dto.response.PaymentResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Admin_OrderResponse {
    Long id;
    Long user_id;
    String code;
    String address;
    String receiver_name;
    String phone;
    String status;
    Integer ship_fee;
    Integer quantity;
    LocalDateTime createAt;
    LocalDateTime paymentAt;
    LocalDateTime cancelAt;
    LocalDateTime completeAt;
    Double total_price;
    CouponResponse coupon;
    PaymentResponse payment;
}
