package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.CategoryRequest;
import com.spring.nailshop.dto.response.CategoryResponse;
import com.spring.nailshop.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CategoryRequest request);
    CategoryResponse toCategoryResponse(Category product);
}
