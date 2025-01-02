package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.ShopUpdateRequest;
import com.spring.nailshop.dto.response.ShopResponse;
import com.spring.nailshop.entity.Shop;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.ShopMapper;
import com.spring.nailshop.repository.ShopRepository;
import com.spring.nailshop.service.ShopService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShopServiceImpl implements ShopService {

    private final ShopRepository shopRepository;

    private final ShopMapper shopMapper;

    @Override
    public void updateShop(ShopUpdateRequest request) {
        Shop shop = shopRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.SHOP_NOT_FOUND));
        shopMapper.updateShop(request, shop);
        shopRepository.save(shop);
    }

    @Override
    public ShopResponse getInfo() {
        Shop shop = shopRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.SHOP_NOT_FOUND));
        return shopMapper.toShopResponse(shop);
    }
}
