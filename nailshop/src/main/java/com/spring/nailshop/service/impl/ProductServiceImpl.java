package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.response.CampaignDetailResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Campaign;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.CampaignMapper;
import com.spring.nailshop.mapper.ProductMapper;
import com.spring.nailshop.repository.CampaignRepository;
import com.spring.nailshop.repository.ProductRepository;
import com.spring.nailshop.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    private final CampaignRepository campaignRepository;

    private final ProductMapper productMapper;

    private final CampaignMapper campaignMapper;

    @Override
    public CampaignDetailResponse getProductsCampaign() {
        LocalDateTime now = LocalDateTime.now();

        List<Campaign> campaigns = campaignRepository.findAll().stream()
                .filter(campaign ->
                        campaign.getStartTime().isBefore(now) &&
                                (campaign.getEndTime() == null || campaign.getEndTime().isAfter(now)) && campaign.getStatus()
                )
                .sorted(Comparator.comparing(Campaign::getStartTime).reversed())
                .collect(Collectors.toList());

        if (!campaigns.isEmpty()) {
            Campaign latestCampaign = campaigns.get(0);
            return campaignMapper.toCampaignResponseDetail(latestCampaign);
        }
        return new CampaignDetailResponse();
    }

    @Override
    public PageResponse<List<ProductResponse>> getAllProduct(Specification<Product> spec, Pageable pageable) {
        Page<Product> products = productRepository.findAll(spec, pageable);

        List<ProductResponse> productResponse = products.getContent()
                .stream().map(productMapper::toProductResponse)
                .toList();

        return PageResponse.<List<ProductResponse>>builder()
                .page(pageable.getPageNumber() + 1)
                .totalPages(products.getTotalPages())
                .size(pageable.getPageSize())
                .total(products.getTotalElements())
                .items(productResponse)
                .build();
    }

    @Override
    public ProductResponse getProductById(long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_ID_INVALID));
        return productMapper.toProductResponse(product);
    }

}
