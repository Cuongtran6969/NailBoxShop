package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.PaymentRequest;
import com.spring.nailshop.dto.response.PaymentResponse;

import java.util.List;

public interface PaymentService {
    List<PaymentResponse> getMethods();

    PaymentResponse getPaymentById(Integer id);

    void createPaymentMethod(PaymentRequest paymentRequest);

    void deleteMethod(Integer id);
}
