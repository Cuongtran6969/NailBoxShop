package com.spring.nailshop.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    USER_EXISTED(400, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(404, "User not existed", HttpStatus.NOT_FOUND),
    USER_NOT_BANNED(400, "User is not banned", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTED(400, "Role not existed", HttpStatus.NOT_FOUND),
    FIRST_NAME_NOT_BLANK(400, "First name is mandatory", HttpStatus.BAD_REQUEST),
    LAST_NAME_NOT_BLANK(400, "Last name is mandatory", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(400, "Password must be at least 6 characters", HttpStatus.BAD_REQUEST),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    INVALID_OTP(400, "OTP is invalid or expired", HttpStatus.BAD_REQUEST),
    INVALID_TOKEN(400, "Token invalid or expired", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(401, "You need to log in to perform this action.", HttpStatus.UNAUTHORIZED),
    EXPIRED_TOKEN(401, "EXPIRED_TOKEN", HttpStatus.UNAUTHORIZED),
    CATEGORIES_EXISTED(400, "Category existed", HttpStatus.BAD_REQUEST),
    CATEGORIES_NOT_EXISTED(400, "Category not existed", HttpStatus.BAD_REQUEST),
    INVALID_DESIGN(400, "Need provide enough image for design", HttpStatus.BAD_REQUEST),
    DESIGN_NOT_EXISTED(400, "Design not exist", HttpStatus.BAD_REQUEST),
    FAIL_DELETE_CLOUDINARY(400, "Fail to delete file", HttpStatus.BAD_REQUEST),
    PRODUCT_ID_INVALID(404, "Product not found", HttpStatus.NOT_FOUND),
    CAMPAIGN_ID_INVALID(404, "Campaign not found", HttpStatus.NOT_FOUND),
    USER_ALREADY_BANNED(400, "User is already banned", HttpStatus.BAD_REQUEST),
    ADDRESS_ID_INVALID(400, "Address invalid", HttpStatus.BAD_REQUEST),
    ADDRESS_MIN_REACH(400, "Limit min is one address", HttpStatus.BAD_REQUEST),
    ADDRESS_MAX_REACH(400, "Limit nax is three address", HttpStatus.BAD_REQUEST),
    ADDRESS_INVALID(400, "Address must be your own.", HttpStatus.BAD_REQUEST),
    COUPON_ID_INVALID(400, "Voucher không hợp lệ", HttpStatus.BAD_REQUEST),
    COUPON_CODE_INVALID(400, "Mã voucher không được tìm thấy", HttpStatus.BAD_REQUEST),
    COUPON_CODE_USED(400, "Voucher đã hết lượt sử dụng", HttpStatus.BAD_REQUEST),
    NO_COUPONS_AVAILABLE(400, "Voucher không hợp lệ", HttpStatus.BAD_REQUEST),
    PAYMENT_ID_INVALID(400, "Payment id invalid", HttpStatus.BAD_REQUEST),
    SHOP_NOT_FOUND(400, "Shop not found", HttpStatus.BAD_REQUEST),
    PRODUCT_EMPTY(400, "Sản phẩm đã hết hàng, vui lòng chọn sản phẩm khác", HttpStatus.BAD_REQUEST),
    ORDER_FAIL(400, "Tạo đơn hàng thất bại", HttpStatus.BAD_REQUEST),
    ORDER_NOT_FOUND(404, "Đơn hàng không tìm thấy, liên hệ để hỗ trợ", HttpStatus.BAD_REQUEST),
    ORDER_PAYMENT_INVALID(404, "Yêu cần thanh toán online không hợp lệ", HttpStatus.BAD_REQUEST),
    POST_NOT_FOUND(400, "Khong tìm thấy post", HttpStatus.BAD_REQUEST),
    NOT_PERMISSION(400, "Bạn không có quyền thực hiện hành động này", HttpStatus.BAD_REQUEST),
    NAIL_CATEGORY_INVALID(404, "Nail category invalid", HttpStatus.BAD_REQUEST),
    NAIL_DESIGN_INVALID(404, "Nail design invalid", HttpStatus.BAD_REQUEST),
    ;
    private int code;
    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
