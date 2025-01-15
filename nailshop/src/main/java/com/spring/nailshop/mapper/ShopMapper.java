package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.ShopUpdateRequest;
import com.spring.nailshop.dto.response.ShopResponse;
import com.spring.nailshop.entity.Category;
import com.spring.nailshop.entity.Shop;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ShopMapper {
    void updateShop(ShopUpdateRequest request, @MappingTarget Shop shop);
    ShopResponse toShopResponse(Shop shop);
}
