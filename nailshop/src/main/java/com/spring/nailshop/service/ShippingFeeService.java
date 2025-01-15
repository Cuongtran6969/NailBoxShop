package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.ShippingFeeRequest;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ShippingFeeService {
    private static final String FEE_URL = "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";


    public Integer calculateShippingFee(Integer serviceTypeId, Integer fromDistrictId, String fromWardCode,
                                       Integer toDistrictId, String toWardCode, Integer length, Integer width,
                                       Integer height, Integer weight, Double insuranceValue, String token, String shopId) {

        // Tạo request body
        ShippingFeeRequest request = new ShippingFeeRequest(serviceTypeId, fromDistrictId, fromWardCode,
                toDistrictId, toWardCode, length, width, height, weight,(int) Math.round(insuranceValue));

        // Tạo headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("token", token);
        headers.set("shop_id", shopId);

        // Tạo HttpEntity với body và headers
        HttpEntity<ShippingFeeRequest> entity = new HttpEntity<>(request, headers);

        RestTemplate restTemplate = new RestTemplate();
        // Gửi POST request
        ResponseEntity<Map> response = restTemplate.exchange(
                FEE_URL,
                HttpMethod.POST,
                entity,
                Map.class
        );

        // Kiểm tra và lấy dữ liệu từ response
        Map<String, Object> responseBody = response.getBody();
        if (responseBody == null || !responseBody.get("code").equals(200)) {
            throw new AppException(ErrorCode.ORDER_FAIL);
        }

        Map<String, Object> data = (Map<String, Object>) responseBody.get("data");
        return (Integer) data.get("total");
    }
}
