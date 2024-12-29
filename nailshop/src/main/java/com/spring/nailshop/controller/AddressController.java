package com.spring.nailshop.controller;

import com.spring.nailshop.dto.request.AddressRequest;
import com.spring.nailshop.dto.response.AddressResponse;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.service.AddressService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/address")
@Tag(name = "Address Controller")
@Slf4j
@Validated
public class AddressController {

    AddressService addressService;

    @PostMapping("/create")
    public ApiResponse<AddressResponse> createAddress(@RequestBody AddressRequest request) {
        return ApiResponse.<AddressResponse>builder()
                .code(HttpStatus.CREATED.value())
                .result(addressService.createAddress(request))
                .message("Address created successfully")
                .build();
    }

    @PutMapping("/update/{addressId}")
    public ApiResponse<AddressResponse> updateAddress(
            @PathVariable(value = "addressId") Long addressId,
            @RequestBody AddressRequest request) {
        return ApiResponse.<AddressResponse>builder()
                .code(HttpStatus.CREATED.value())
                .result(addressService.updateAddress(request, addressId))
                .message("Address update successfully")
                .build();
    }

    @DeleteMapping("/delete/{addressId}")
    public ApiResponse<AddressResponse> deleteAddress(
            @PathVariable(value = "addressId") Long addressId) {
        addressService.deleteAddress(addressId);
        return ApiResponse.<AddressResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Address delete successfully")
                .build();
    }

    @GetMapping("/my-addresses")
    public ApiResponse<List<AddressResponse>> getMyAddress() {
        return ApiResponse.<List<AddressResponse>>builder()
                .code(HttpStatus.CREATED.value())
                .result(addressService.getAllMyAddress())
                .message("Address delete successfully")
                .build();
    }


}
