package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.CampaignRequest;
import com.spring.nailshop.dto.request.ProductUpdateRequest;
import com.spring.nailshop.dto.response.CampaignResponse;
import com.spring.nailshop.entity.Campaign;
import com.spring.nailshop.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CampaignMapper {
    Campaign toCampaign(CampaignRequest request);

    @Mapping(target = "products", source = "products")
    CampaignResponse toCampaignResponse(Campaign campaign);

    void updateCampaign(CampaignRequest request, @MappingTarget Campaign campaign);

}
