package com.spring.nailshop.controller;

import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.CampaignDetailResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.service.ProductService;
import com.turkraft.springfilter.boot.Filter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
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
    @GetMapping("/products")
    public ApiResponse<PageResponse<List<ProductResponse>>> getProducts(
            @Filter Specification<Product> spec,
            @RequestParam(defaultValue = "createAt:desc") String[] sort,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page - 1, size, getSortOrder(sort));
        return ApiResponse.<PageResponse<List<ProductResponse>>>builder()
                .code(HttpStatus.OK.value())
                .result(productService.getAllProduct(spec, pageable))
                .build();
    }

    @GetMapping("/product/{id}")
    public ApiResponse<ProductResponse> getProductById(
            @PathVariable Long id
    ) {
        return ApiResponse.<ProductResponse>builder()
                .code(HttpStatus.OK.value())
                .result(productService.getProductById(id))
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
