package com.spring.nailshop.service.impl;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.spring.nailshop.dto.request.OrderItemRequest;
import com.spring.nailshop.dto.request.OrderRequest;
import com.spring.nailshop.dto.response.OrderCreateSuccess;
import com.spring.nailshop.entity.*;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.repository.*;
import com.spring.nailshop.service.CouponService;
import com.spring.nailshop.service.OrderService;
import com.spring.nailshop.service.ShippingFeeService;
import com.spring.nailshop.service.ShopService;
import com.spring.nailshop.util.CouponType;
import com.spring.nailshop.util.OrderStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    private final DesignRepository designRepository;

    private final CouponRepository couponRepository;

    private final UserRepository userRepository;

    private final ShippingFeeService shippingFeeService;

    private final ShopRepository shopRepository;

    private final PaymentRepository paymentRepository;

    private final CouponService couponService;

    @Transactional
    @Override
    public OrderCreateSuccess createOrder(OrderRequest request) {
        SecurityContext contextHolder = SecurityContextHolder.getContext();
        String email = contextHolder.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Shop shop = shopRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.SHOP_NOT_FOUND));
        Payment payment = paymentRepository.findById(request.getPayment_id())
                .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_ID_INVALID));

        double totalPrice = 0.0;
        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_ID_INVALID));

            // Kiểm tra stock
            if (product.getStock() < itemRequest.getQuantity()) {
                throw new AppException(ErrorCode.PRODUCT_EMPTY);
            }
            // Tính giá tiền cho sản phẩm sau dicount
            Double unitPrice = product.getPrice().doubleValue();

            if (product.getDiscount() != null) {
                unitPrice -= (unitPrice * product.getDiscount() / 100);
            }

            Design design = null;
            if(itemRequest.getDesignId() != null) {
                design = designRepository.findById(itemRequest.getDesignId())
                        .orElseThrow(() -> new AppException(ErrorCode.DESIGN_NOT_EXISTED));
            }

            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .design(design)
                    .quantity(itemRequest.getQuantity())
                    .unitPrice(product.getPrice().doubleValue())
                    .discount(product.getDiscount())
                    .size(itemRequest.getSize())
                    .build();

            orderItems.add(orderItem);

            totalPrice += unitPrice * itemRequest.getQuantity();

            // Cập nhật kho
            product.setStock(product.getStock() - itemRequest.getQuantity());
            product.setSold(product.getSold() + itemRequest.getQuantity());
            productRepository.save(product);
        }
        // Áp dụng mã giảm giá nếu có
        Coupon coupon = null;
        if (!request.getCoupon_code().isEmpty()) {
            coupon = couponRepository.findByCodeToUse(request.getCoupon_code())
                    .orElseThrow(() -> new AppException(ErrorCode.COUPON_CODE_USED));
            totalPrice -= (totalPrice * coupon.getAmount() / 100);
            coupon.setIs_used(true);
            couponRepository.save(coupon);
        }
        String code = generateUniqueCouponCode();

        Integer shipFee = shippingFeeService.calculateShippingFee(
                2, shop.getDistrict_id(), shop.getWard_code()+"",
                request.getDistrict_id(), request.getWard_code()+"",
                shop.getBoxLength(), shop.getBoxWidth(),
                shop.getBoxHeight(), shop.getBoxWeight(),
                totalPrice, shop.getToken(), shop.getShop_id());

        if (coupon != null && coupon.getType() != CouponType.FREE_SHIP) {
            totalPrice+=shipFee;
        }

        // Tạo đơn hàng
        Order order = Order.builder()
                .user(user) // Chỉ cần set userId
                .receiver_name(request.getReceiver_name())
                .phone(request.getPhone())
                .detail(request.getDetail())
                .province_id(request.getProvince_id())
                .province_name(request.getProvince_name())
                .district_id(request.getDistrict_id())
                .district_name(request.getDistrict_name())
                .ward_code(request.getWard_code())
                .ward_name(request.getWard_name())
                .status(OrderStatus.PENDING)
                .ship_fee(shipFee)
                .coupon(coupon)
                .payment(payment)
                .orderItems(orderItems)
                .total_price(totalPrice)
                .build();

        for (OrderItem orderItem : orderItems) {
            orderItem.setOrder(order); // Gán order cho orderItem
        }
        orderRepository.save(order);
         return OrderCreateSuccess.builder()
                 .total_fee(totalPrice)
                 .shipping_fee(shipFee)
                 .code(code)
                 .build();
    }

    public boolean isCodeUnique(String code) {
        return orderRepository.findByCode(code).isEmpty();
    }

    public String generateUniqueCouponCode() {
        String code;
        do {
            code = generateOrderCode();
        } while (!isCodeUnique(code));
        return code;
    }

    public String generateOrderCode() {
        char[] alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();
        SecureRandom secureRandom = new SecureRandom();
        String couponCode = NanoIdUtils.randomNanoId(secureRandom, alphabet, 6);
        return couponCode;
    }

}
