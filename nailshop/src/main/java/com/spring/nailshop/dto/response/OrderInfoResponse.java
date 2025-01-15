package com.spring.nailshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderInfoResponse {
  Long orderId;
  Integer totalPrice;
  String orderCode;
  String status;
  Integer shipFee;
  Boolean isFreeShip;
  String qrImg;
}
