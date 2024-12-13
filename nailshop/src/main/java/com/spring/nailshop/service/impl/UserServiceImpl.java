package com.spring.nailshop.service.impl;

import com.spring.nailshop.constant.PredefinedRole;
import com.spring.nailshop.dto.request.EmailRequest;
import com.spring.nailshop.dto.request.UserCreationRequest;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.entity.Role;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.UserMapper;
import com.spring.nailshop.repository.RoleRepository;
import com.spring.nailshop.repository.UserRepository;
import com.spring.nailshop.service.MailService;
import com.spring.nailshop.service.OtpService;
import com.spring.nailshop.service.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final MailService mailService;

    private final OtpService otpService;

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream().map(userMapper::toUserResponse).toList();
    }

    @Override
    public UserResponse createUser(UserCreationRequest request, String otp) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        //check otp
        String storeOtp = otpService.getOtp(request.getEmail());
        if (storeOtp == null || !storeOtp.equals(otp)) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }

        User user = userMapper.toUser(request);
        Role role = roleRepository.findByName(PredefinedRole.USER_ROLE)
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED));

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(role);
        user.setName(request.getFirstName() +" "+request.getLastName());
        userRepository.save(user);
        otpService.deleteOtp(request.getEmail());
        return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse getUserInfo(Long userId) {
        return userMapper.toUserResponse(userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }

    @Override
    public void sendOtpRegister(EmailRequest request)
            throws MessagingException, UnsupportedEncodingException {
        String otp = generateOtp();
        //luu otp vao cache
        otpService.saveOtp(request.getEmail(), otp);

        String subject = "Your OTP Code for Account Registration";

        StringBuilder content = new StringBuilder();
        content.append("<html>")
                .append("<body style='font-family: Arial, sans-serif; line-height: 1.6;'>")
                .append("<h2 style='color: #4CAF50;'>Welcome to DLearning!</h2>")
                .append("<p>Dear <strong>")
                .append(request.getEmail())
                .append("</strong>,</p>")
                .append("<p>Thank you for registering with <strong>DLearning</strong>. We are excited to have you on board!</p>")
                .append("<p style='font-size: 18px;'><strong>Your OTP Code is:</strong> ")
                .append("<span style='font-size: 22px; color: #FF5733;'><strong>")
                .append(otp)
                .append("</strong></span></p>")
                .append("<p><strong>Note:</strong> This OTP is valid for <em>5 minutes</em>. Please enter it as soon as possible to complete your registration.</p>")
                .append("<p>If you did not request this code, please ignore this email. For your security, do not share this code with anyone.</p>")
                .append("<br/>")
                .append("<p>Best regards,</p>")
                .append("<p><strong>DLearning Team</strong></p>")
                .append("</body>")
                .append("</html>");
        String emailContent = content.toString();
        mailService.sendMail(List.of(request.getEmail()), subject, emailContent, null);
    }

    private static String generateOtp(){
        Random random = new Random();
        StringBuilder otp = new StringBuilder();
        for(int i = 0; i < 6 ; i++){
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }

}
