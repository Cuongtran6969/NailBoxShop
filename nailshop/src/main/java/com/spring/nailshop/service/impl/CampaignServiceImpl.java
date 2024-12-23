package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.CampaignRequest;
import com.spring.nailshop.dto.response.CampaignResponse;
import com.spring.nailshop.entity.Campaign;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.CampaignMapper;
import com.spring.nailshop.repository.CampaignRepository;
import com.spring.nailshop.service.AdminProductService;
import com.spring.nailshop.service.CampaignService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public CampaignResponse addCampaign(CampaignRequest request) {
        Campaign campaign = campaignMapper.toCampaign(request);
        List<Product> products = adminProductService.getProductsByIds(request.getProductIds());
        campaign.setProducts(products);
        campaignRepository.save(campaign);
        return campaignMapper.toCampaignResponse(campaign);
    }

    @Override
    public CampaignResponse updateCampaign(CampaignRequest request, Long id) {
        Campaign campaign = campaignRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CAMPAIGN_ID_INVALID));
        campaignMapper.updateCampaign(request, campaign);
        List<Product> products = adminProductService.getProductsByIds(request.getProductIds());
        campaign.setProducts(products);
        campaignRepository.save(campaign);
        return campaignMapper.toCampaignResponse(campaign);
    }

    @Override
    public void deleteCampaign(Long id) {
        Campaign campaign = campaignRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CAMPAIGN_ID_INVALID));
        campaignRepository.delete(campaign);
    }
}
