package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.response.CampaignDetailResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.entity.Campaign;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.mapper.CampaignMapper;
import com.spring.nailshop.mapper.ProductMapper;
import com.spring.nailshop.repository.CampaignRepository;
import com.spring.nailshop.repository.ProductRepository;
import com.spring.nailshop.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
                                (campaign.getEndTime() == null || campaign.getEndTime().isAfter(now))
                )
                .sorted(Comparator.comparing(Campaign::getStartTime).reversed())
                .collect(Collectors.toList());

        if (!campaigns.isEmpty()) {
            Campaign latestCampaign = campaigns.get(0);
            return campaignMapper.toCampaignResponseDetail(latestCampaign);
        }
        return new CampaignDetailResponse();
    }

}
