package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.PaymentRequest;
import com.spring.nailshop.dto.request.ProductRequest;
import com.spring.nailshop.dto.response.PaymentResponse;
import com.spring.nailshop.dto.response.UserUpdateResponse;
import com.spring.nailshop.entity.Payment;
import com.spring.nailshop.entity.Product;
import com.spring.nailshop.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PaymentMapper {
    PaymentResponse toPaymentResponse(Payment payment);

    Payment toPayment(PaymentRequest request);
}
