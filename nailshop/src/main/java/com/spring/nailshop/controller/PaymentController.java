package com.spring.nailshop.controller;

import com.spring.nailshop.dto.request.PaymentRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.PaymentResponse;
import com.spring.nailshop.service.PaymentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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
@RequestMapping("/api/v1")
@Tag(name = "Payment Controller")
@Slf4j
@Validated
public class PaymentController {

    PaymentService paymentService;

    @GetMapping("/payment/methods")
    public ApiResponse<List<PaymentResponse>> getMethod() {
         return ApiResponse.<List<PaymentResponse>>builder()
                 .result(paymentService.getMethods())
                 .code(HttpStatus.OK.value())
                 .message("Get all method payment success")
                 .build();
    }

    @GetMapping("/payment/method/{id}")
    public ApiResponse<PaymentResponse> getMethodById(@PathVariable Integer id) {
        return ApiResponse.<PaymentResponse>builder()
                .result(paymentService.getPaymentById(id))
                .code(HttpStatus.OK.value())
                .message("Get method payment success")
                .build();
    }

    @PostMapping("/payment/create")
    public ApiResponse<Void> createPaymentMethod(@RequestBody PaymentRequest request) {
        paymentService.createPaymentMethod(request);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create a method payment success")
                .build();
    }

    @DeleteMapping("/payment/delete/{id}")
    public ApiResponse<Void> deletePaymentMethod(@PathVariable Integer id) {
        paymentService.deleteMethod(id);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Delete a method payment success")
                .build();
    }





}
