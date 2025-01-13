package com.spring.nailshop.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.spring.nailshop.dto.request.PaymentCreateRequest;
import com.spring.nailshop.dto.request.PaymentRequest;
import com.spring.nailshop.dto.response.*;
import com.spring.nailshop.service.CloudinaryService;
import com.spring.nailshop.service.OrderService;
import com.spring.nailshop.service.PaymentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.payos.PayOS;
import vn.payos.type.*;

import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/v1")
@Tag(name = "Payment Controller")
@Slf4j
@Validated
public class PaymentController {

    PaymentService paymentService;

    PayOS payOS;

    OrderService orderService;

    CloudinaryService cloudinaryService;

    Integer paymentMinus = 5;

    @PostMapping(path = "/paymentQR/create")
    public ObjectNode createPaymentLink(@RequestBody PaymentCreateRequest request) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            OrderInfoResponse order = orderService.getOrderToPaymentInfo(request.getOrderId());
            int price = order.getTotalPrice();
            if(!order.getIsFreeShip()) {
                price += order.getShipFee();
            }
            PaymentData paymentData = PaymentData.builder().orderCode(order.getOrderId())
                    .cancelUrl("")
                    .returnUrl("")
                    .description(order.getOrderCode())
                    .amount(price).build();
            String qrImagePath = getQRImage(payOS.createPaymentLink(paymentData).getQrCode());
            String linkImage = cloudinaryService.uploadImageBase64(qrImagePath);
            orderService.savePaymentQr(order.getOrderId(), linkImage);
            response.put("error", 0);
            response.put("message", "success");
            return response;
        } catch (Exception e) {
            response.put("error", -1);
            response.put("message", e.getMessage());
            return response;
        }
    }

    public String getQRImage(String qrCodeData) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(qrCodeData, BarcodeFormat.QR_CODE, 500, 500);

            // Chuyển đổi QR code thành byte array
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);

            // Mã hóa ảnh thành Base64
            byte[] imageBytes = outputStream.toByteArray();
            return Base64.getEncoder().encodeToString(imageBytes);
        } catch (Exception e) {
            return "";
        }
    }

    //call api check status order space 2 second
    @GetMapping(path = "/paymentQR/{orderId}")
    public ObjectNode getOrderById(@PathVariable("orderId") long orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();

        try {
            PaymentLinkData order = payOS.getPaymentLinkInformation(orderId);
            if(order.getStatus().equals("PAID")) {
              orderService.paymentSuccess(orderId);
            }
            response.set("data", objectMapper.valueToTree(order));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;
        }

    }

    @PutMapping(path = "/paymentQR/cancel/{orderId}")
    public ObjectNode cancelOrder(@PathVariable("orderId") long orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            PaymentLinkData order = payOS.cancelPaymentLink(orderId, null);
            orderService.cancelOrder(orderId);
            response.set("data", objectMapper.valueToTree(order));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;
        }
    }

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

    @PostMapping("/payment/method/create")
    public ApiResponse<Void> createPaymentMethod(@RequestBody PaymentRequest request) {
        paymentService.createPaymentMethod(request);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create a method payment success")
                .build();
    }

    @DeleteMapping("/payment/method/delete/{id}")
    public ApiResponse<Void> deletePaymentMethod(@PathVariable Integer id) {
        paymentService.deleteMethod(id);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Delete a method payment success")
                .build();
    }

}
