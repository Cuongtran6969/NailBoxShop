package com.spring.nailshop.service;

import com.spring.nailshop.dto.response.CampaignDetailResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.entity.Product;

import java.util.List;

public interface ProductService {
    CampaignDetailResponse getProductsCampaign();
}
