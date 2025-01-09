package com.spring.nailshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderSummaryResponse {
    Long currentOrder;
    Long previousOrder;
}
