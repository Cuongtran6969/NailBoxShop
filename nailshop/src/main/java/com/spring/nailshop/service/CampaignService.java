package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.CampaignRequest;
import com.spring.nailshop.dto.request.CampaignStatusUpdate;
import com.spring.nailshop.dto.response.CampaignDetailResponse;
import com.spring.nailshop.dto.response.CampaignResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.entity.Campaign;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface CampaignService {
    CampaignDetailResponse addCampaign(CampaignRequest campaign);

    CampaignDetailResponse updateCampaign(CampaignRequest request, Long id);

    CampaignDetailResponse getCampaignById(Long id);

    void updateCampaignStatus(CampaignStatusUpdate request);

    void deleteCampaign(Long id);

    PageResponse<List<CampaignResponse>> getAllCampaign(Specification<Campaign> spec, Pageable pageable);
}
