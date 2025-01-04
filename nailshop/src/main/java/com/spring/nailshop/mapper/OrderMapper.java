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
    @Mapping(target = "address", source = "order", qualifiedByName = "concatAddress")
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

    @Named("concatAddress")
    default String concatAddress(Order order) {
        String province = order.getProvince_name() != null ? order.getProvince_name() : "";
        String district = order.getDistrict_name() != null ? order.getDistrict_name() : "";
        String ward = order.getWard_name() != null ? order.getWard_name() : "";
        String detail = order.getDetail() != null ? order.getDetail() : "";
        return String.join(", ", province, district, ward, detail).trim();
}
}
