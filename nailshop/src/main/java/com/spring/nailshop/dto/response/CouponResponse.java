package com.spring.nailshop.dto.response;

import com.spring.nailshop.util.CouponType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CouponResponse {
    Long id;
    String code;
    String type;
    Double amount;
    Boolean isUsed;
    LocalDateTime startTime;
    LocalDateTime endTime;
}
