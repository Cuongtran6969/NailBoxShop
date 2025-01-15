package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.AddressRequest;
import com.spring.nailshop.dto.request.ProductUpdateRequest;
import com.spring.nailshop.dto.response.AddressResponse;
import com.spring.nailshop.entity.Address;
import com.spring.nailshop.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    Address toAddress(AddressRequest request);

    AddressResponse toAddressResponse(Address request);

    void updateAddress(AddressRequest request, @MappingTarget Address address);
}
