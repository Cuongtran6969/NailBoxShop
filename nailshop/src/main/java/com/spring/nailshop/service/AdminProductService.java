package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.*;
import com.spring.nailshop.dto.response.DesignResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Category;
import com.spring.nailshop.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public interface AdminProductService {
   ProductResponse createProduct(ProductRequest productRequest, List<MultipartFile> productImages, List<MultipartFile> designImages);

   String deleteProductDesign(long designId);

   DesignResponse updateProductDesign(MultipartFile image, DesignUpdateRequest request);

   DesignResponse createProductDesign(Long proId, MultipartFile image, DesignRequest request);

   void updateProductStatus(ProductStatusRequest request);

   PageResponse<List<Admin_ProductResponse>> getAllProduct(Specification<Product> spec, Pageable pageable);

   ProductResponse getProductDetail(long productId);

   ProductResponse updateProduct(ProductUpdateRequest request, List<MultipartFile> productImages);

   List<Product> getProductsByIds(List<Long> ids);



}
