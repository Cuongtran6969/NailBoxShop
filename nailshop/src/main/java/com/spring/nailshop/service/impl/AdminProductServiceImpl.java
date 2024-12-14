package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.DesignRequest;
import com.spring.nailshop.dto.request.ProductRequest;
import com.spring.nailshop.dto.response.ProductResponse;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    public ProductResponse createProduct(ProductRequest productRequest, List<MultipartFile> productImages, List<MultipartFile> designImages) {
        if (designImages != null && productRequest.getDesigns().size() != designImages.size()) {
            throw new AppException(ErrorCode.INVALID_DESIGN);
        }
        Product product = productMapper.toProduct(productRequest);

        //set Design for product
        if (!productRequest.getDesigns().isEmpty()) {
            int i = 0;
            Set<Design> designs = new HashSet<>();
            for (DesignRequest designRequest : productRequest.getDesigns()) {
                String picture = cloudinaryService.uploadImage(designImages.get(i));
                Design design = designMapper.toDesign(designRequest);
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

}
