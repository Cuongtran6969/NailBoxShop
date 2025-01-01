package com.spring.nailshop.dto.response;

import com.spring.nailshop.util.CouponType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CouponResponse {
    String type;
    Double amount;
    Boolean isAvailable;
}
