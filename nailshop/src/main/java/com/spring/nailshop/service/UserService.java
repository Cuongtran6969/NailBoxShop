package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.EmailRequest;
import com.spring.nailshop.dto.request.UserCreationRequest;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.entity.User;
import jakarta.mail.MessagingException;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.io.UnsupportedEncodingException;
import java.util.List;


public interface UserService {
    List<UserResponse> getAllUsers();

    UserResponse createUser(UserCreationRequest request, String otp);

    UserResponse getUserInfo(Long userId);

    void sendOtpRegister(EmailRequest request) throws MessagingException, UnsupportedEncodingException;
}
