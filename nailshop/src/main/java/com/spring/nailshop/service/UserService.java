package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.EmailRequest;
import com.spring.nailshop.dto.request.PasswordCreationRequest;
import com.spring.nailshop.dto.request.UserCreationRequest;
import com.spring.nailshop.dto.request.UserInfoUpdateRequest;
import com.spring.nailshop.dto.response.UserProfileResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.dto.response.UserUpdateResponse;
import com.spring.nailshop.entity.User;
import jakarta.mail.MessagingException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.io.UnsupportedEncodingException;
import java.util.List;


public interface UserService {

    UserResponse createUser(UserCreationRequest request, String otp);

    UserProfileResponse getInfoProfile();

    void sendOtpRegister(EmailRequest request) throws MessagingException, UnsupportedEncodingException;

    UserUpdateResponse updateUser(UserInfoUpdateRequest request, MultipartFile file);

    void sendOtpForgotPassword(EmailRequest request) throws MessagingException, UnsupportedEncodingException;

    void resetPassword(PasswordCreationRequest request);
}
