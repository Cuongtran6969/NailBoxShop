package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.DesignRequest;
import com.spring.nailshop.dto.request.ProductRequest;
import com.spring.nailshop.dto.request.ProductUpdateRequest;
import com.spring.nailshop.dto.request.UserUpdateRequest;
import com.spring.nailshop.dto.response.ProductDetailResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Design;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toProduct(ProductRequest request);

    @Mapping(target = "pictures", source = "pictures")
    @Mapping(target = "categories", source = "categories")
    @Mapping(target = "designs", source = "designs") // Sử dụng DesignMapper
    ProductResponse toProductResponse(Product product);

    @Mapping(target = "pictures", source = "pictures")
    @Mapping(target = "categories", source = "categories")
    @Mapping(source = "createAt", target = "createAt")
    Admin_ProductResponse toAdminProductResponse(Product product);

    void updateProduct(ProductUpdateRequest request, @MappingTarget Product product);
}
