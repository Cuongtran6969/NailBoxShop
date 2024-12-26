package com.spring.nailshop.service;

import com.spring.nailshop.dto.response.CampaignDetailResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface ProductService {
    CampaignDetailResponse getProductsCampaign();

    PageResponse<List<ProductResponse>> getAllProduct(Specification<Product> spec, Pageable pageable);

    ProductResponse getProductById(long productId);
}
