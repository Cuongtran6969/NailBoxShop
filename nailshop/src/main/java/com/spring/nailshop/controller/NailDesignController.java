package com.spring.nailshop.controller;

import com.spring.nailshop.dto.request.NailCateCreateRequest;
import com.spring.nailshop.dto.request.NailDesignCreateRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.NailCateResponse;
import com.spring.nailshop.dto.response.NailDesignResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.entity.NailDesign;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.service.NailDesignService;
import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.tags.Tag;
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

import java.util.List;

@RestController
@RequestMapping("/api/v1/design")
@Tag(name = "Nail design Controller")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Validated
public class NailDesignController {

    NailDesignService nailDesignService;

    @PostMapping("/create")
    public ApiResponse<Void> createNailDesign(@RequestBody NailDesignCreateRequest request) {
        nailDesignService.createNailDesign(request);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Create nail design successfully")
                .build();
    }

    @PostMapping("/category/create")
    public ApiResponse<Void> createNailCategory(@RequestBody NailCateCreateRequest request) {
        nailDesignService.createNailCategory(request);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Create nail category successfully")
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<PageResponse<List<NailDesignResponse>>> getNailDesigns(
            @Filter Specification<NailDesign> spec,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return ApiResponse.<PageResponse<List<NailDesignResponse>>>builder()
                .result(nailDesignService.getAllNailDesign(spec, pageable))
                .code(HttpStatus.OK.value())
                .message("get nail design successfully")
                .build();
    }

    @GetMapping("/cate/all")
    public ApiResponse<PageResponse<List<NailCateResponse>>> getNailCategories(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return ApiResponse.<PageResponse<List<NailCateResponse>>>builder()
                .result(nailDesignService.getAllNailCates(pageable))
                .code(HttpStatus.OK.value())
                .message("Create nail category successfully")
                .build();
    }

    @DeleteMapping("{id}")
    public ApiResponse<Void> deleteNailDesign(@PathVariable Integer id) {
        nailDesignService.deleteNailDesign(id);
        return ApiResponse.<Void>builder()
                .message("Delete nail design successfully")
                .code(HttpStatus.OK.value())
                .build();
    }


}
