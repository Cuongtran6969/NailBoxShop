package com.spring.nailshop.controller;

import com.spring.nailshop.dto.request.CampaignRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.CampaignResponse;
import com.spring.nailshop.entity.Campaign;
import com.spring.nailshop.service.CampaignService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/campaign")
@Tag(name = "Campaign Controller")
@Slf4j
@Validated
public class CampaignController {

    CampaignService campaignService;

    @PostMapping("/create")
    public ApiResponse<CampaignResponse> createCampaign(@RequestBody @Valid CampaignRequest request) {
        return ApiResponse.<CampaignResponse>builder()
                .result(campaignService.addCampaign(request))
                .code(HttpStatus.CREATED.value())
                .message("Add campaign successfully")
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<CampaignResponse> updateCampaign(
            @PathVariable Long id,
            @RequestBody @Valid CampaignRequest request) {
        return ApiResponse.<CampaignResponse>builder()
                .result(campaignService.updateCampaign(request, id))
                .code(HttpStatus.CREATED.value())
                .message("Update campaign successfully")
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Campaign> deleteCamapign(@PathVariable Long id) {
        campaignService.deleteCampaign(id);
        return ApiResponse.<Campaign>builder()
                .code(HttpStatus.CREATED.value())
                .message("Delete campaign successfully")
                .build();
    }
}
