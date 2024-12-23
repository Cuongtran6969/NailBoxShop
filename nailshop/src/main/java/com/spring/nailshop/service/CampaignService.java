package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.CampaignRequest;
import com.spring.nailshop.dto.response.CampaignResponse;
import com.spring.nailshop.entity.Campaign;

public interface CampaignService {
    CampaignResponse addCampaign(CampaignRequest campaign);

    CampaignResponse updateCampaign(CampaignRequest request, Long id);

    void deleteCampaign(Long id);
}
