package com.spring.nailshop.service.impl;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.spring.nailshop.dto.request.OrderItemRequest;
import com.spring.nailshop.dto.request.OrderRequest;
import com.spring.nailshop.dto.request.OrderUpdateRequest;
import com.spring.nailshop.dto.response.*;
import com.spring.nailshop.dto.response.admin.Admin_ProductResponse;
import com.spring.nailshop.entity.*;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.OrderItemMapper;
import com.spring.nailshop.mapper.OrderMapper;
import com.spring.nailshop.mapper.ProductMapper;
import com.spring.nailshop.model.TimeRange;
import com.spring.nailshop.repository.*;
import com.spring.nailshop.service.CouponService;
import com.spring.nailshop.service.OrderService;
import com.spring.nailshop.service.ShippingFeeService;
import com.spring.nailshop.util.CouponType;
import com.spring.nailshop.util.OrderStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.*;

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

    private final OrderItemRepository orderItemRepository;

    private final OrderMapper orderMapper;

    private final OrderItemMapper orderItemMapper;

    @Transactional
    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('USER')")
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
                String customMessage = product.getName() + " đã hết hàng, vui lòng chọn sản phẩm khác.";
                ErrorCode.PRODUCT_EMPTY.setMessage(customMessage);
                throw new AppException(ErrorCode.PRODUCT_EMPTY);
            }
            // Tính giá tiền cho sản phẩm sau dicount
            Double unitPrice = product.getPrice().doubleValue();

            if (product.getDiscount() != null) {
                unitPrice -= (unitPrice * product.getDiscount() / 100);
            }

            Design design = null;
            if (itemRequest.getDesignId() != null) {
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
                2, shop.getDistrict_id(), shop.getWard_code() + "",
                request.getDistrict_id(), request.getWard_code() + "",
                shop.getBoxLength(), shop.getBoxWidth(),
                shop.getBoxHeight(), shop.getBoxWeight(),
                totalPrice, shop.getToken(), shop.getShop_id());

        // Total price not include ship || include discount
        Order order = Order.builder()
                .user(user) // Chỉ cần set userId
                .receiverName(request.getReceiver_name())
                .phone(request.getPhone())
                .detail(request.getDetail())
                .province_id(request.getProvince_id())
                .province_name(request.getProvince_name())
                .district_id(request.getDistrict_id())
                .district_name(request.getDistrict_name())
                .ward_code(request.getWard_code())
                .ward_name(request.getWard_name())
                .status(OrderStatus.PENDING)
                .shipFee(shipFee)
                .code(code)
                .coupon(coupon)
                .payment(payment)
                .orderItems(orderItems)
                .totalPrice(totalPrice)
                .build();

        for (OrderItem orderItem : orderItems) {
            orderItem.setOrder(order); // Gán order cho orderItem
        }
        orderRepository.save(order);
        return OrderCreateSuccess.builder()
                .id(order.getId())
                .total_fee(totalPrice)
                .shipping_fee(shipFee)
                .code(code)
                .build();
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('USER')")
    public OrderInfoResponse getOrderToPaymentInfo(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        if (order.getPayment().getId() != 1 || !order.getStatus().equals(OrderStatus.PENDING)) {
            throw new AppException(ErrorCode.ORDER_PAYMENT_INVALID);
        }
        boolean isShipFree = false;
        if(order.getCoupon() != null) {
            isShipFree = order.getCoupon().getType().equals(CouponType.FREE_SHIP);
        }
        return OrderInfoResponse.builder()
                .orderId(order.getId())
                .totalPrice((int) Math.round(order.getTotalPrice()))
                .orderCode(order.getCode())
                .shipFee((int) Math.round(order.getShipFee()))
                .isFreeShip(isShipFree)
                .status(order.getStatus().name())
                .build();
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('USER')")
    public void savePaymentQr(Long orderId, String image) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        order.setQr_img(image);
        orderRepository.save(order);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('USER')")
    public OrderPaymentInfoResponse getOrderPaymentInfo(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        Shop shop = shopRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.SHOP_NOT_FOUND));
        return OrderPaymentInfoResponse.builder()
                .accountName(shop.getBank_account_name())
                .bankCode(shop.getBank_code())
                .bankName(shop.getBank_name())
                .qrImage(order.getQr_img())
                .orderCode(order.getCode())
                .totalPrice(order.getTotalPrice())
                .status(order.getStatus().name())
                .createdAt(order.getCreateAt())
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

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('USER')")
    public PageResponse<List<OrderResponse>> getMyOrder(Pageable pageable) {
        SecurityContext contextHolder = SecurityContextHolder.getContext();
        String email = contextHolder.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Page<Order> orders = orderRepository.findOrderByUserId(
                user.getId(),
                pageable
        );

        List<OrderResponse> orderResponses = orders.getContent().stream().map(orderMapper::toOrderResponse).toList();
        for (OrderResponse od : orderResponses) {
            List<OrderItemResponse> orderItems = orderItemRepository.findByOrderId(od.getId()).stream().map(this::convertToOrderItemResponse).toList();
            od.setItems(orderItems);
        }
        return PageResponse.<List<OrderResponse>>builder()
                .size(pageable.getPageSize())
                .page(pageable.getPageNumber() + 1)
                .totalPages(orders.getTotalPages())
                .total(orders.getTotalElements())
                .items(orderResponses)
                .build();
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('USER')")
    public void cancelOrder(Long orderId) {
        SecurityContext contextHolder = SecurityContextHolder.getContext();
        String email = contextHolder.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        if(order.getUser().getId().equals(user.getId())) {
            order.setCancelAt(LocalDateTime.now());
            order.setStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);
        } else {
            throw new AppException(ErrorCode.NOT_PERMISSION);
        }
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAuthority('USER')")
    public void paymentSuccess(Long orderId) {
        SecurityContext contextHolder = SecurityContextHolder.getContext();
        String email = contextHolder.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        if(order.getUser().getId().equals(user.getId())) {
            order.setPaymentAt(LocalDateTime.now());
            order.setStatus(OrderStatus.PAYMENT_SUCCESS);
            orderRepository.save(order);
        } else {
            throw new AppException(ErrorCode.NOT_PERMISSION);
        }
    }


    private OrderItemResponse convertToOrderItemResponse(OrderItem item) {
        return orderItemMapper.toOrderItemResponse(item);
    }

}
