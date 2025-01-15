package com.spring.nailshop.dto.request;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRequest {
     String receiver_name;
     String phone;
     Integer province_id;
     Integer district_id;
     String ward_code;
     String province_name;
     String district_name;
     String ward_name;
     String detail;
     String coupon_code;
     List<OrderItemRequest> items;
     Integer payment_id;
}
