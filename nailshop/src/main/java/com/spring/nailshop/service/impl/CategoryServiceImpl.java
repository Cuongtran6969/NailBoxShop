package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.CategoryRequest;
import com.spring.nailshop.dto.response.CategoryResponse;
import com.spring.nailshop.entity.Category;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.CategoryMapper;
import com.spring.nailshop.repository.CategoryRepository;
import com.spring.nailshop.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final CategoryMapper categoryMapper;

    @Override
    public void addCategories(CategoryRequest request) {
        categoryRepository.findByName(request.getName())
                .ifPresent(category -> { throw new AppException(ErrorCode.CATEGORIES_EXISTED); });
        categoryRepository.save(categoryMapper.toCategory(request));
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream().map(categoryMapper::toCategoryResponse).toList();
    }

    @Override
    public Set<Category> getCategoriesByIds(Set<Long> ids) {
        Set<Category> categories = new HashSet<>();
        for (Long categoryId : ids) {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORIES_NOT_EXISTED));
            categories.add(category);
        }
        return categories;
    }

}
