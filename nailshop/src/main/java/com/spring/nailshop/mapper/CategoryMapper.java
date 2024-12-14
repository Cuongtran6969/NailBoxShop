package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.CategoryRequest;
import com.spring.nailshop.dto.request.DesignRequest;
import com.spring.nailshop.dto.response.CategoryResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.entity.Category;
import com.spring.nailshop.entity.Design;
import com.spring.nailshop.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CategoryRequest request);
    CategoryResponse toCategoryResponse(Category product);
}
