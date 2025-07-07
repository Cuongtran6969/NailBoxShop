package com.spring.nailshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderPaymentInfoResponse {
    Long orderId;
    String qrImage;
    String orderCode;
    String status;
    String bankName;
    String bankCode;
    String accountName;
    Double totalPrice;
    LocalDateTime createdAt;
}
