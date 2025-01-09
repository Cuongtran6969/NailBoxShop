package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.ShopBannersRequest;
import com.spring.nailshop.dto.request.ShopUpdateRequest;
import com.spring.nailshop.dto.response.ShopResponse;
import com.spring.nailshop.dto.response.VisitorSummaryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ShopService {
    void updateShop(ShopUpdateRequest request);

    ShopResponse getInfo();

    String updateBanner(ShopBannersRequest banner, List<MultipartFile> images);
}
