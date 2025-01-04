package com.spring.nailshop.dto.response;

import com.spring.nailshop.entity.Design;
import com.spring.nailshop.entity.Order;
import com.spring.nailshop.entity.Product;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemResponse {
    String productName;

    String designName;

    String picture;

    Integer quantity;

    Double unitPrice;

    Integer discount;

    String size;
}
