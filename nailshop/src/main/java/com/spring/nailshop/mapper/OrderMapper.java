package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.response.admin.Admin_OrderResponse;
import com.spring.nailshop.entity.Order;
import com.spring.nailshop.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "coupon", source = "coupon")
    @Mapping(target = "payment", source = "payment")
    @Mapping(target = "user_id",  source= "user.id")
    @Mapping(target = "quantity", source = "orderItems", qualifiedByName = "calculateTotalQuantity")
    Admin_OrderResponse toAdminOrderResponse(Order order);


    @Named("calculateTotalQuantity")
    default int calculateTotalQuantity(List<OrderItem> orderItems) {
        if (orderItems == null || orderItems.isEmpty()) {
            return 0;
        }
        return orderItems.stream()
                .mapToInt(OrderItem::getQuantity)
                .sum();
    }

}
