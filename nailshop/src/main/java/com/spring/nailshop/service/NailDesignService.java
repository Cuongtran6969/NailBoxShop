package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.NailCateCreateRequest;
import com.spring.nailshop.dto.request.NailDesignCreateRequest;
import com.spring.nailshop.dto.response.NailCateResponse;
import com.spring.nailshop.dto.response.NailDesignResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.entity.NailDesign;
import com.spring.nailshop.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface NailDesignService {
    void createNailDesign(NailDesignCreateRequest request);

    void createNailCategory(NailCateCreateRequest request);

    PageResponse<List<NailCateResponse>> getAllNailCates(Pageable pageable);

    PageResponse<List<NailDesignResponse>> getAllNailDesign(Specification<NailDesign> spec, Pageable pageable);

    void deleteNailDesign(Integer id);
}
