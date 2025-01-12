package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.PaymentRequest;
import com.spring.nailshop.dto.response.PaymentResponse;
import com.spring.nailshop.entity.Payment;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.PaymentMapper;
import com.spring.nailshop.repository.PaymentRepository;
import com.spring.nailshop.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    private final PaymentMapper paymentMapper;

    @Override
    public List<PaymentResponse> getMethods() {
        return paymentRepository.findAll()
                .stream().map(paymentMapper::toPaymentResponse).toList();
    }

    @Override
    public PaymentResponse getPaymentById(Integer id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_ID_INVALID));
        return paymentMapper.toPaymentResponse(payment);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('ADMIN')")
    public void createPaymentMethod(PaymentRequest paymentRequest) {
        Payment payment = paymentMapper.toPayment(paymentRequest);
        paymentRepository.save(payment);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('ADMIN')")
    public void deleteMethod(Integer id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_ID_INVALID));
        paymentRepository.delete(payment);
    }
}
