package com.spring.nailshop.dto.request;

import com.spring.nailshop.util.CouponType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CouponRequest {
    CouponType type;
    Double amount;
    Integer number;
    LocalDateTime startTime;
    LocalDateTime endTime;
}
