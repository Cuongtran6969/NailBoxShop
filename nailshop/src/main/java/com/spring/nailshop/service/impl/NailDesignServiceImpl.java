package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.NailCateCreateRequest;
import com.spring.nailshop.dto.request.NailDesignCreateRequest;
import com.spring.nailshop.dto.response.NailCateResponse;
import com.spring.nailshop.dto.response.NailDesignResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.entity.NailCategory;
import com.spring.nailshop.entity.NailDesign;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.NailCateMapper;
import com.spring.nailshop.mapper.NailDesignMapper;
import com.spring.nailshop.repository.NailCategoryRepository;
import com.spring.nailshop.repository.NailDesignRepository;
import com.spring.nailshop.service.NailDesignService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class NailDesignServiceImpl implements NailDesignService {

    private final NailCategoryRepository nailCategoryRepository;

    private final NailDesignRepository nailDesignRepository;

    private final NailCateMapper nailCateMapper;

    private final NailDesignMapper nailDesignMapper;

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public void createNailDesign(NailDesignCreateRequest request) {
        NailCategory nailCategory = nailCategoryRepository.findById(request.getCategoryId()).orElseThrow(() ->
          new AppException(ErrorCode.NAIL_CATEGORY_INVALID));

        NailDesign nailDesign = NailDesign.builder()
                .nailCategory(nailCategory)
                .name(request.getName())
                .images(request.getImages())
                .build();

        nailDesignRepository.save(nailDesign);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public void createNailCategory(NailCateCreateRequest request) {
        NailCategory nailCategory = NailCategory.builder()
                .name(request.getName())
                .image(request.getImage())
                .build();
        nailCategoryRepository.save(nailCategory);
    }

    @Override
    public PageResponse<List<NailCateResponse>> getAllNailCates(Pageable pageable) {

        Page<NailCategory> nailCates = nailCategoryRepository.findAll(pageable);

        List<NailCateResponse> nailCateResponse = nailCates.getContent().stream()
                .map(nailCateMapper::toNailCateResponse).toList();

        return PageResponse.<List<NailCateResponse>>builder()
                .page(pageable.getPageNumber() + 1)
                .totalPages(nailCates.getTotalPages())
                .size(pageable.getPageSize())
                .total(nailCates.getTotalElements())
                .items(nailCateResponse)
                .build();
    }

    @Override
    public PageResponse<List<NailDesignResponse>> getAllNailDesign(Specification<NailDesign> spec, Pageable pageable) {
        Page<NailDesign> nailDesigns = nailDesignRepository.findAll(spec, pageable);

        List<NailDesignResponse> nailDesignResponses = nailDesigns.getContent().stream()
                .map(nailDesignMapper::toNailDesignResponse).toList();


        return PageResponse.<List<NailDesignResponse>>builder()
                .page(pageable.getPageNumber() + 1)
                .totalPages(nailDesigns.getTotalPages())
                .size(pageable.getPageSize())
                .total(nailDesigns.getTotalElements())
                .items(nailDesignResponses)
                .build();
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public void deleteNailDesign(Integer id) {
        NailDesign nailDesign = nailDesignRepository.findById(id).orElseThrow(() ->
                new AppException(ErrorCode.NAIL_DESIGN_INVALID));
        nailDesignRepository.delete(nailDesign);
    }


}
