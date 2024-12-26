package com.spring.nailshop.controller.admin;

import com.spring.nailshop.dto.request.*;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.DesignResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.service.AdminProductService;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
@RestController
@RequestMapping("/admin/products")
@RequiredArgsConstructor
public class AdminProductController {

    private final AdminProductService adminProductService;

    @PostMapping("/create-product")
    public ApiResponse<ProductResponse> createProduct(
            @RequestPart("product") @Valid ProductRequest productRequest,
            @RequestPart(value = "productImages", required = false) List<MultipartFile> productImages,
            @RequestPart(value = "designImages", required = false) List<MultipartFile> designImages
    ) {
        return ApiResponse.<ProductResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Add product successfully")
                .result(adminProductService.createProduct(productRequest, productImages, designImages))
                .build();
    }

    @PutMapping("/update-product")
    public ApiResponse<ProductResponse> updateProduct(
            @RequestPart(value = "productImages", required = false) List<MultipartFile> productImages,
            @RequestPart(value = "product") ProductUpdateRequest request) {
       ;
        return ApiResponse.<ProductResponse>builder()
                .code(HttpStatus.OK.value())
                .result(adminProductService.updateProduct(request, productImages))
                .message("Update product successfully")
                .build();
    }

    @DeleteMapping("/delete-design/{designId}")
    public ApiResponse<Void> DeleteDesign(
            @PathVariable(value = "designId") Long designId
    ) {
        String designName = adminProductService.deleteProductDesign(designId);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.CREATED.value())
                .message(String.format("Delete design %s successfully", designName))
                .build();
    }

    @PutMapping("/update-status")
    public ApiResponse<ProductResponse> updateProductStatus(
            @RequestBody @Valid ProductStatusRequest request
    ) {
        adminProductService.updateProductStatus(request);
        return ApiResponse.<ProductResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Update product status successfully")
                .build();
    }

    @PostMapping("/create-design/{id}")
    public ApiResponse<DesignResponse> createProductDesign(
            @PathVariable(value = "id") Long id,
            @RequestPart(value = "image", required = false) MultipartFile designImage,
            @RequestPart("design") @Valid DesignRequest request
    ) {
        return ApiResponse.<DesignResponse>builder()
                .code(HttpStatus.CREATED.value())
                .result(adminProductService.createProductDesign(id, designImage, request))
                .message("Create design for product successfully")
                .build();
    }

    @PutMapping("/update-design")
    public ApiResponse<DesignResponse> updateProductDesign(
            @RequestPart(value = "image", required = false) MultipartFile designImage,
            @RequestPart("design") @Valid DesignUpdateRequest request
    ) {
        ;
        return ApiResponse.<DesignResponse>builder()
                .code(HttpStatus.CREATED.value())
                .result(adminProductService.updateProductDesign(designImage, request))
                .message("Update design successfully")
                .build();
    }

    @GetMapping("/get-product")
    public ApiResponse<PageResponse<List<Admin_ProductResponse>>> getAllProduct(
            @Filter Specification<Product> spec,
            @RequestParam(defaultValue = "createAt:desc") String[] sort,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page - 1, size, getSortOrder(sort));
        return ApiResponse.<PageResponse<List<Admin_ProductResponse>>>builder()
                .code(HttpStatus.OK.value())
                .result(adminProductService.getAllProduct(spec, pageable))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ProductResponse> getProductDetail(
            @PathVariable Long id
    ) {
        return ApiResponse.<ProductResponse>builder()
                .code(HttpStatus.OK.value())
                .result(adminProductService.getProductDetail(id))
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
