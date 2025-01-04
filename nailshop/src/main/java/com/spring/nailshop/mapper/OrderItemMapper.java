package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.response.OrderItemResponse;
import com.spring.nailshop.dto.response.admin.Admin_OrderResponse;
import com.spring.nailshop.entity.Order;
import com.spring.nailshop.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {

    @Mapping(target = "productName", source = "product.name")
    @Mapping(target = "designName", source = "design.name")
    @Mapping(target = "picture", expression = "java(getPicture(orderItem))")
    OrderItemResponse toOrderItemResponse(OrderItem orderItem);

    default String getPicture(OrderItem orderItem) {
        return (orderItem.getDesign() != null)
                ? orderItem.getDesign().getPicture()
                : orderItem.getProduct().getPictures().split(",")[0];
    }
}
