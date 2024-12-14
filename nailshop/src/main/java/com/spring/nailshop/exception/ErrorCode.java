package com.spring.nailshop.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    USER_EXISTED(400, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(404, "User not existed", HttpStatus.NOT_FOUND),
    ROLE_NOT_EXISTED(400, "Role not existed", HttpStatus.NOT_FOUND),
    FIRST_NAME_NOT_BLANK(400, "First name is mandatory", HttpStatus.BAD_REQUEST),
    LAST_NAME_NOT_BLANK(400, "Last name is mandatory", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(400, "Password must be at least 6 characters", HttpStatus.BAD_REQUEST),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    INVALID_OTP(400, "OTP is invalid or expired", HttpStatus.BAD_REQUEST),
    INVALID_TOKEN(400, "OTP is invalid or expired", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(401, "You need to log in to perform this action.", HttpStatus.UNAUTHORIZED),
    CATEGORIES_EXISTED(400, "Category existed", HttpStatus.BAD_REQUEST),
    CATEGORIES_NOT_EXISTED(400, "Category not existed", HttpStatus.BAD_REQUEST),
    INVALID_DESIGN(400, "Need provide enough image for design", HttpStatus.BAD_REQUEST),
    ;
    private int code;
    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}
