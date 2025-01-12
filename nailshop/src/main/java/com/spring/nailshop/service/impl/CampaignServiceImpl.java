package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.CampaignRequest;
import com.spring.nailshop.dto.request.CampaignStatusUpdate;
import com.spring.nailshop.dto.response.CampaignDetailResponse;
import com.spring.nailshop.dto.response.CampaignResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Campaign;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.CampaignMapper;
import com.spring.nailshop.repository.CampaignRepository;
import com.spring.nailshop.repository.specification.UserSpecification;
import com.spring.nailshop.service.AdminProductService;
import com.spring.nailshop.service.CampaignService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class CampaignServiceImpl implements CampaignService {

    private final CampaignRepository campaignRepository;
    private final CampaignMapper campaignMapper;
    private final AdminProductService adminProductService;

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('ADMIN, STAFF')")
    public CampaignDetailResponse addCampaign(CampaignRequest request) {
        Campaign campaign = campaignMapper.toCampaign(request);
        List<Product> products = adminProductService.getProductsByIds(request.getProductIds());
        campaign.setProducts(products);
        campaignRepository.save(campaign);
        return campaignMapper.toCampaignResponseDetail(campaign);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('ADMIN, STAFF')")
    public CampaignDetailResponse updateCampaign(CampaignRequest request, Long id) {
        Campaign campaign = campaignRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CAMPAIGN_ID_INVALID));
        campaignMapper.updateCampaign(request, campaign);
        List<Product> products = adminProductService.getProductsByIds(request.getProductIds());
        campaign.setProducts(products);
        campaignRepository.save(campaign);
        return campaignMapper.toCampaignResponseDetail(campaign);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('ADMIN, STAFF')")
    public CampaignDetailResponse getCampaignById(Long id) {
        Campaign campaign = campaignRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CAMPAIGN_ID_INVALID));
        return campaignMapper.toCampaignResponseDetail(campaign);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('ADMIN, STAFF')")
    public void updateCampaignStatus(CampaignStatusUpdate request) {
        Campaign campaign = campaignRepository.findById(request.getId()).orElseThrow(() -> new AppException(ErrorCode.CAMPAIGN_ID_INVALID));
        campaign.setStatus(request.getStatus());
        campaignRepository.save(campaign);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('ADMIN, STAFF')")
    public void deleteCampaign(Long id) {
        Campaign campaign = campaignRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CAMPAIGN_ID_INVALID));
        campaignRepository.delete(campaign);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('ADMIN, STAFF')")
    public PageResponse<List<CampaignResponse>> getAllCampaign(Specification<Campaign> spec, Pageable pageable) {
        Page<Campaign> campaigns = campaignRepository.findAll(spec, pageable);

        List<CampaignResponse> campaignResponse = campaigns.getContent()
                .stream().map(campaignMapper::toCampaignResponse)
                .toList();

        return PageResponse.<List<CampaignResponse>>builder()
                .page(pageable.getPageNumber() + 1)
                .totalPages(campaigns.getTotalPages())
                .size(pageable.getPageSize())
                .total(campaigns.getTotalElements())
                .items(campaignResponse)
                .build();
    }

}
