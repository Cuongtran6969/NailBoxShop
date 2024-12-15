package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.ProductRequest;
import com.spring.nailshop.dto.request.ProductStatusRequest;
import com.spring.nailshop.dto.response.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdminProductService {
   ProductResponse createProduct(ProductRequest productRequest, List<MultipartFile> productImages, List<MultipartFile> designImages);

   String deleteProductDesign(long designId);

   void updateProductStatus(ProductStatusRequest request);
}
