package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.*;
import com.spring.nailshop.dto.response.DesignResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Category;
import com.spring.nailshop.entity.Design;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.DesignMapper;
import com.spring.nailshop.mapper.ProductMapper;
import com.spring.nailshop.repository.DesignRepository;
import com.spring.nailshop.repository.ProductRepository;
import com.spring.nailshop.service.AdminProductService;
import com.spring.nailshop.service.CategoryService;
import com.spring.nailshop.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminProductServiceImpl implements AdminProductService {

    private final ProductRepository productRepository;

    private final DesignRepository designRepository;

    private final CloudinaryService cloudinaryService;

    private final DesignMapper designMapper;

    private final ProductMapper productMapper;

    private final CategoryService categoryService;


    @Override
    @Transactional
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public ProductResponse createProduct(ProductRequest productRequest, List<MultipartFile> productImages, List<MultipartFile> designImages) {
//        if (designImages != null && productRequest.getDesigns().size() != designImages.size()) {
//            throw new AppException(ErrorCode.INVALID_DESIGN);
//        }
        Product product = productMapper.toProduct(productRequest);
        //set Design for product
        if (productRequest.getDesigns()!= null && !productRequest.getDesigns().isEmpty()) {
            int i = 0;
            Set<Design> designs = new HashSet<>();
            for (DesignRequest designRequest : productRequest.getDesigns()) {
                String picture = cloudinaryService.uploadImage(designImages.get(i));
                Design design = designMapper.toDesign(designRequest);
                design.setName(designRequest.getName());
                design.setPicture(picture);
                design.setProduct(product);
                designs.add(design);
                i++;
            }
            product.setDesigns(designs);
        }

        //set category for product
        if (!productRequest.getCategoryIds().isEmpty()) {
            Set<Category> categories = categoryService.getCategoriesByIds(productRequest.getCategoryIds());
            product.setCategories(categories);
        }

        //set pictures for product
        if (productImages != null && !productImages.isEmpty()) {
            List<String> imageUrls = productImages.stream()
                    .map(cloudinaryService::uploadImage)
                    .collect(Collectors.toList());
            String pictures = String.join(",", imageUrls);
            product.setPictures(pictures);
        }
        productRepository.save(product);
        return productMapper.toProductResponse(product);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public String deleteProductDesign(long designId) {
        var design = designRepository.findById(designId).orElseThrow(() -> new AppException(ErrorCode.DESIGN_NOT_EXISTED));
        designRepository.delete(design);
//        cloudinaryService.deleteImage(design.getPicture());
        return design.getName();
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public DesignResponse updateProductDesign(MultipartFile image, DesignUpdateRequest request) {
        Design design = designRepository.findById(request.getId()).orElseThrow(() -> new AppException(ErrorCode.DESIGN_NOT_EXISTED));
        if(image != null) {
            String picture = cloudinaryService.uploadImage(image);
            design.setPicture(picture);
        }
        design.setName(request.getName());
        designRepository.save(design);
        return designMapper.toDesignResponse(design);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public DesignResponse createProductDesign(Long proId, MultipartFile image, DesignRequest request) {
        Product product = productRepository.findById(proId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_ID_INVALID));
        Design design = new Design();
        if(image != null) {
            String picture = cloudinaryService.uploadImage(image);
            design.setPicture(picture);
        }
        design.setName(request.getName());
        design.setProduct(product);
        designRepository.save(design);
        return designMapper.toDesignResponse(design);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public void updateProductStatus(ProductStatusRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_ID_INVALID));
        product.setIsActive(request.getStatus());
        productRepository.save(product);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public PageResponse<List<Admin_ProductResponse>> getAllProduct(Specification<Product> spec, Pageable pageable) {
        Page<Product> products = productRepository.findAll(spec, pageable);

        List<Admin_ProductResponse> productResponse = products.getContent()
                .stream().map(productMapper::toAdminProductResponse)
                .toList();

        return PageResponse.<List<Admin_ProductResponse>>builder()
                .page(pageable.getPageNumber() + 1)
                .totalPages(products.getTotalPages())
                .size(pageable.getPageSize())
                .total(products.getTotalElements())
                .items(productResponse)
                .build();
    }


    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public ProductResponse getProductDetail(long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_ID_INVALID));
        return productMapper.toProductResponse(product);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public ProductResponse updateProduct(ProductUpdateRequest request, List<MultipartFile> productImages) {
        Product product = productRepository.findById(request.getId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_ID_INVALID));
        productMapper.updateProduct(request, product);

        Set<String> currentPictures = new HashSet<>();
        if (product.getPictures() != null && !product.getPictures().isEmpty()) {
            currentPictures.addAll(Arrays.asList(product.getPictures().split(",")));
        }

        if (request.getOldImages() != null && !request.getOldImages().isEmpty()) {
            currentPictures.retainAll(request.getOldImages());
        } else {
            currentPictures.clear();
        }

        if (productImages != null && !productImages.isEmpty()) {
            List<String> newImageUrls = productImages.stream()
                    .map(cloudinaryService::uploadImage)
                    .collect(Collectors.toList());
            currentPictures.addAll(newImageUrls);
        }

        product.setPictures(String.join(",", currentPictures));

        if (!request.getCategoryIds().isEmpty()) {
            Set<Category> categories = categoryService.getCategoriesByIds(request.getCategoryIds());
            product.setCategories(categories);
        }

        productRepository.save(product);
        log.info("Product info updated successfully");
        return productMapper.toProductResponse(product);
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public List<Product> getProductsByIds(List<Long> ids) {
        List<Product> products = new ArrayList<>();
        for (Long proId : ids) {
            Product product = productRepository.findById(proId)
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_ID_INVALID));
            products.add(product);
        }
        return products;
    }



}