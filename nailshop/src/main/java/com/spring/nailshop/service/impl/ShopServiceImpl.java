package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.ShopBannersRequest;
import com.spring.nailshop.dto.request.ShopUpdateRequest;
import com.spring.nailshop.dto.response.ShopResponse;
import com.spring.nailshop.entity.Shop;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.ShopMapper;
import com.spring.nailshop.repository.ShopRepository;
import com.spring.nailshop.service.CloudinaryService;
import com.spring.nailshop.service.ShopService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShopServiceImpl implements ShopService {

    private final ShopRepository shopRepository;

    private final ShopMapper shopMapper;

    private final CloudinaryService cloudinaryService;

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

    @Override
    public String updateBanner(ShopBannersRequest banner, List<MultipartFile> images) {
        Shop shop = shopRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.SHOP_NOT_FOUND));
        Set<String> currentBanners = new HashSet<>();
        if (shop.getBanners() != null && !shop.getBanners().isEmpty()) {
            currentBanners.addAll(Arrays.asList(shop.getBanners().split(",")));
        }
         //chi du lai nhung anh cu
        if (banner.getOldImages() != null && !banner.getOldImages().isEmpty()) {
            currentBanners.retainAll(banner.getOldImages());
        } else {
            currentBanners.clear();
        }

        if (images != null && !images.isEmpty()) {
            List<String> newImageUrls = images.stream()
                    .map(cloudinaryService::uploadImage)
                    .collect(Collectors.toList());
            currentBanners.addAll(newImageUrls);
        }
        String banners = String.join(",", currentBanners);
        shop.setBanners(banners);
        shopRepository.save(shop);
        return banners;
    }
}
