package com.spring.nailshop.util;

public enum OrderStatus {
    PENDING,      // Đang chờ xử lý => khi đơn hàng được tạo => trong quá trình chuyển khoản và chờ admin xác nhận processing (quá trình giao hàng)
    PAYMENT_SUCCESS,
    PROCESSING,   // Đang xử lý => khi đơn hàng đang chờ lấy hàng + đang vận chuyển
    COMPLETED,    // Hoàn thành => khi đơn hàng ship thành công
    CANCELLED;    // Đã hủy => khi đơn hàng không chuyển khoản hoặc hủy
}
