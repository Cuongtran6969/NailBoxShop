package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.DesignRequest;
import com.spring.nailshop.dto.request.ProductRequest;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Design;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toProduct(ProductRequest request);

    @Mapping(target = "pictures", source = "pictures")
    @Mapping(target = "categories", source = "categories")
    ProductResponse toProductResponse(Product product);

    @Mapping(target = "pictures", source = "pictures")
    @Mapping(target = "categories", source = "categories")
    Admin_ProductResponse toAdminProductResponse(Product product);
}
