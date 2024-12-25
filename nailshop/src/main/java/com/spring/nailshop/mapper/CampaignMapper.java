package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.CampaignRequest;
import com.spring.nailshop.dto.response.CampaignDetailResponse;
import com.spring.nailshop.dto.response.CampaignResponse;
import com.spring.nailshop.entity.Campaign;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CampaignMapper {
    Campaign toCampaign(CampaignRequest request);

    @Mapping(target = "products", source = "products")
    CampaignDetailResponse toCampaignResponseDetail(Campaign campaign);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "status", source = "status")
    @Mapping(target = "numberProduct", expression = "java(campaign.getProducts() != null ? campaign.getProducts().size() : 0)")
    CampaignResponse toCampaignResponse(Campaign campaign);

    void updateCampaign(CampaignRequest request, @MappingTarget Campaign campaign);

}
