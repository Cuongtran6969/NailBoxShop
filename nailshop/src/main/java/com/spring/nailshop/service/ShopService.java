package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.ShopUpdateRequest;
import com.spring.nailshop.dto.response.ShopResponse;

public interface ShopService {
    void updateShop(ShopUpdateRequest request);

    ShopResponse getInfo();
}
