package com.spring.nailshop.exception;

import com.spring.nailshop.dto.response.ApiResponse;
import jakarta.validation.ConstraintViolation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse<?>> handlingRuntimeException(Exception e) {
        log.error(e.getMessage(), e);
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setMessage(e.getMessage());
        apiResponse.setCode(400);
        return ResponseEntity.badRequest().body(apiResponse);
    }
    @ExceptionHandler(value = BadCredentialsException.class)
    ResponseEntity<ApiResponse<?>> handleBadCredentialsException(BadCredentialsException e) {
        log.error("Authentication failed: {}", e.getMessage());
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setCode(401);
        apiResponse.setMessage("Email or password is incorrect");
        return ResponseEntity.status(401).body(apiResponse);
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse<?>> handlingAppException(AppException exception) {
        log.error(exception.getMessage(), exception);
        ErrorCode errorCode = exception.getErrorCode();

        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse<?>> handlingMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        Map<String, String> errors = new HashMap<>();
        for(ObjectError error : e.getBindingResult().getAllErrors()) {
            try {
                errorCode = ErrorCode.valueOf(error.getDefaultMessage());
            } catch (IllegalArgumentException ex) {

            }
            String fieldName = ((FieldError) error).getField();
            String errorMessage = errorCode.getMessage();
            errors.put(fieldName, errorMessage);
        }
        ApiResponse<Map<String, String>> apiResponse = new ApiResponse<>();
        apiResponse.setCode(400);
        apiResponse.setResult(errors);
        return ResponseEntity.badRequest().body(apiResponse);
    }
}
