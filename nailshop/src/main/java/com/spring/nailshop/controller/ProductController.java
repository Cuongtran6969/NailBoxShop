package com.spring.nailshop.controller;

import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.CampaignDetailResponse;
import com.spring.nailshop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/product/campaign")
    public ApiResponse<CampaignDetailResponse> getAllProductCampaign(
    ) {
        return ApiResponse.<CampaignDetailResponse>builder()
                .code(HttpStatus.OK.value())
                .result(productService.getProductsCampaign())
                .build();
    }
}
