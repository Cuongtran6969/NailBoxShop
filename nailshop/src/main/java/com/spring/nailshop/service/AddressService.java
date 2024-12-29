package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.AddressRequest;
import com.spring.nailshop.dto.response.AddressResponse;

import java.util.List;

public interface AddressService {
    AddressResponse createAddress(AddressRequest request);

    AddressResponse updateAddress(AddressRequest request, Long addressId);

    void deleteAddress(Long addressId);

    List<AddressResponse> getAllMyAddress();
}
