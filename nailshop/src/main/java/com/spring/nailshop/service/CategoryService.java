package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.CategoryRequest;
import com.spring.nailshop.dto.response.CategoryResponse;
import com.spring.nailshop.entity.Category;

import java.util.List;
import java.util.Set;

public interface CategoryService {
    void addCategories(CategoryRequest request);

    List<CategoryResponse> getAllCategories();

    Set<Category> getCategoriesByIds(Set<Long> ids);
}
