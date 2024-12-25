package com.spring.nailshop.controller;

import com.spring.nailshop.dto.request.CampaignRequest;
import com.spring.nailshop.dto.request.CampaignStatusUpdate;
import com.spring.nailshop.dto.response.*;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Campaign;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.service.CampaignService;
import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
    public ApiResponse<CampaignDetailResponse> createCampaign(@RequestBody @Valid CampaignRequest request) {
        return ApiResponse.<CampaignDetailResponse>builder()
                .result(campaignService.addCampaign(request))
                .code(HttpStatus.CREATED.value())
                .message("Add campaign successfully")
                .build();
    }


    @GetMapping("/search")
    public ApiResponse<PageResponse<List<CampaignResponse>>> getAllUsers(
            @Filter Specification<Campaign> spec,
            @RequestParam(defaultValue = "startTime:desc") String[] sort,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page - 1, size, getSortOrder(sort));
        return ApiResponse.<PageResponse<List<CampaignResponse>>>builder()
                .code(HttpStatus.OK.value())
                .result(campaignService.getAllCampaign(spec, pageable))
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<CampaignDetailResponse> updateCampaign(
            @PathVariable Long id,
            @RequestBody @Valid CampaignRequest request) {
        return ApiResponse.<CampaignDetailResponse>builder()
                .result(campaignService.updateCampaign(request, id))
                .code(HttpStatus.OK.value())
                .message("Update campaign successfully")
                .build();
    }
    @GetMapping("/{id}/detail")
    public ApiResponse<CampaignDetailResponse> getDetail(
            @PathVariable Long id) {
        return ApiResponse.<CampaignDetailResponse>builder()
                .result(campaignService.getCampaignById(id))
                .code(HttpStatus.OK.value())
                .message("Get campaign detail successfully")
                .build();
    }

    @PutMapping("/update-status")
    public ApiResponse<Void> updateCampaign(
            @RequestBody @Valid CampaignStatusUpdate request) {
        campaignService.updateCampaignStatus(request);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Update campaign status successfully")
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Campaign> deleteCampaign(@PathVariable Long id) {
        campaignService.deleteCampaign(id);
        return ApiResponse.<Campaign>builder()
                .code(HttpStatus.OK.value())
                .message("Delete campaign successfully")
                .build();
    }

    private Sort getSortOrder(String[] sort) {
        List<Sort.Order> orders = new ArrayList<>();
        for (String s : sort) {
            String[] sortDetails = s.split(":");
            String sortBy = sortDetails[0];
            String sortDir = sortDetails.length > 1 ? sortDetails[1] : "asc";
            log.info("sortBy: {}, sortDir: {}", sortBy, sortDir);

            Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
            orders.add(new Sort.Order(direction, sortBy));
        }
        return Sort.by(orders);
    }
}
