package com.spring.nailshop.dto.request;

import com.spring.nailshop.util.OrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderUpdateRequest {
    Long id;
    OrderStatus status;
}
