package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.AddressRequest;
import com.spring.nailshop.dto.response.AddressResponse;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.Address;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.AddressMapper;
import com.spring.nailshop.repository.AddressRepository;
import com.spring.nailshop.repository.UserRepository;
import com.spring.nailshop.service.AddressService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    private final UserRepository userRepository;

    private final AddressMapper addressMapper;

    int MIN_ADDRESS = 1;

    int MAX_ADDRESS = 3;

    @Override
    @PreAuthorize("isAuthenticated()")
    public AddressResponse createAddress(AddressRequest request) {
        SecurityContext contextHolder = SecurityContextHolder.getContext();
        String email = contextHolder.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if(getNumberAddress(user.getId()) == MAX_ADDRESS) {
            throw new AppException(ErrorCode.ADDRESS_MAX_REACH);
        }
        Address address = addressMapper.toAddress(request);
        address.setUser(user);
        addressRepository.save(address);
        return addressMapper.toAddressResponse(address);
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public AddressResponse updateAddress(AddressRequest request, Long addressId) {
        SecurityContext contextHolder = SecurityContextHolder.getContext();
        String email = contextHolder.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Address address = addressRepository.findById(addressId).orElseThrow(() -> new AppException(ErrorCode.ADDRESS_ID_INVALID));

        if(!Objects.equals(address.getUser().getId(), user.getId())) {
            throw new AppException(ErrorCode.ADDRESS_INVALID);
        }
        addressMapper.updateAddress(request, address);
        addressRepository.save(address);
        return addressMapper.toAddressResponse(address);
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public void deleteAddress(Long addressId) {
        Address address = addressRepository.findById(addressId).orElseThrow(() -> new AppException(ErrorCode.ADDRESS_ID_INVALID));
        SecurityContext contextHolder = SecurityContextHolder.getContext();
        String email = contextHolder.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if(!Objects.equals(address.getUser().getId(), user.getId())) {
            throw new AppException(ErrorCode.ADDRESS_INVALID);
        }
        if(getNumberAddress(user.getId()) == MIN_ADDRESS) {
            throw new AppException(ErrorCode.ADDRESS_MIN_REACH);
        }
        addressRepository.delete(address);
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public List<AddressResponse> getAllMyAddress() {
        SecurityContext contextHolder = SecurityContextHolder.getContext();
        String email = contextHolder.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        List<Address> addresses = addressRepository.findAddressByUserId(user.getId());
        return addresses.stream().map(addressMapper::toAddressResponse).toList();
    }

    public int getNumberAddress(Long userId) {
       return addressRepository.countAddressesByUserId(userId);
    }
}
