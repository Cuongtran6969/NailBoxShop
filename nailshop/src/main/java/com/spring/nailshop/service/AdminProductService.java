package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.ProductRequest;
import com.spring.nailshop.dto.request.ProductStatusRequest;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.ProductResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdminProductService {
   ProductResponse createProduct(ProductRequest productRequest, List<MultipartFile> productImages, List<MultipartFile> designImages);

   String deleteProductDesign(long designId);

   void updateProductStatus(ProductStatusRequest request);

   PageResponse<List<Admin_ProductResponse>> getAllProduct(Specification<Product> spec, Pageable pageable);
}
