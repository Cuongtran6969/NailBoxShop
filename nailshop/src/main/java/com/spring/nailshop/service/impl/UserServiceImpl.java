package com.spring.nailshop.service.impl;

import com.spring.nailshop.constant.PredefinedRole;
import com.spring.nailshop.dto.request.EmailRequest;
import com.spring.nailshop.dto.request.PasswordCreationRequest;
import com.spring.nailshop.dto.request.UserCreationRequest;
import com.spring.nailshop.dto.request.UserInfoUpdateRequest;
import com.spring.nailshop.dto.response.UserProfileResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.dto.response.UserUpdateResponse;
import com.spring.nailshop.entity.Role;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.ProfileMapper;
import com.spring.nailshop.mapper.UserMapper;
import com.spring.nailshop.repository.RoleRepository;
import com.spring.nailshop.repository.UserRepository;
import com.spring.nailshop.service.CloudinaryService;
import com.spring.nailshop.service.MailService;
import com.spring.nailshop.service.OtpService;
import com.spring.nailshop.service.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final ProfileMapper profileMapper;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final MailService mailService;

    private final OtpService otpService;

    private final CloudinaryService cloudinaryService;

    @Override
    public UserResponse createUser(UserCreationRequest request, String otp) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
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
        user.setName(request.getFirstName() + " " + request.getLastName());
        userRepository.save(user);
        otpService.deleteOtp(request.getEmail());
        return userMapper.toUserResponse(user);
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public UserProfileResponse getInfoProfile() {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        User user = userRepository.findByEmail(email).orElseThrow(()
                -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toProfileResponse(user);
    }


    @Override
    public void sendOtpRegister(EmailRequest request)
            throws MessagingException, UnsupportedEncodingException {
        String otp = generateOtp();
        //luu otp vao cache
        otpService.saveOtp(request.getEmail(), otp);

        String subject = "Mã OTP của bạn để đăng ký tài khoản";
        StringBuilder content = new StringBuilder();
        content.append("<html>")
                .append("<head>")
                .append("<style>")
                .append("  body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; }")
                .append("  .container { max-width: 600px; margin: 20px auto; background: #ffffff; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden; }")
                .append("  .header { padding: 20px; text-align: center; background: #f5f5f5; border-bottom: 1px solid #dddddd; }")
                .append("  .header h1 { color: #333333; font-size: 24px; margin: 0; }")
                .append("  .content { padding: 20px; color: #333333; line-height: 1.6; }")
                .append("  .content h2 { color: #4CAF50; font-size: 22px; }")
                .append("  .otp { font-size: 36px; color: #FF5733; font-weight: bold; margin: 20px 0; text-align: center; }")
                .append("  .footer { text-align: center; padding: 20px; background: #f5f5f5; border-top: 1px solid #dddddd; color: #999999; font-size: 12px; }")
                .append("</style>")
                .append("</head>")
                .append("<body>")
                .append("<div class='container'>")
                .append("<div class='header'>")
                .append("<h1>NaiLaBox</h1>")
                .append("</div>")
                .append("<div class='content'>")
                .append("<h2>Xin chào, ").append(request.getEmail()).append("</h2>")
                .append("<p>Sử dụng mã bên dưới để hoàn tất đăng ký của bạn:</p>")
                .append("<div class='otp'>").append(otp).append("</div>")
                .append("<p><strong>Note:</strong> Mã này hết hạn trong <strong>5 phút</strong>. Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này hoặc <a href='https://zalo.me/0383459560' style='color: #4CAF50;'>liên hệ với chúng tôi</a>.</p>")
                .append("</div>")
                .append("<div class='footer'>")
                .append("Được cung cấp bởi nhóm<br>")
                .append("Để được hỗ trợ, <a href='https://zalo.me/0383459560' style='color: #4CAF50;'>liên hệ với chúng tôi</a>.")
                .append("</div>")
                .append("</div>")
                .append("</body>")
                .append("</html>");
        String emailContent = content.toString();
        mailService.sendMail(List.of(request.getEmail()), subject, emailContent, null);
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public UserUpdateResponse updateUser(UserInfoUpdateRequest request, MultipartFile file) {
        SecurityContext contextHolder = SecurityContextHolder.getContext();
        String email = contextHolder.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        profileMapper.updateUser(request, user);
        if (file != null && !file.isEmpty()) {
            String avatar = cloudinaryService.uploadImage(file);
            user.setAvatar(avatar);
        }
        user.setName(request.getFirstName() + " " + request.getLastName());
        userRepository.save(user);
        log.info("User profile updated successfully for user with email: {}", email);
        return profileMapper.toUserUpdateResponse(user);
    }

    @Override
    public void sendOtpForgotPassword(EmailRequest request) throws MessagingException, UnsupportedEncodingException {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        String otp = generateOtp();

        otpService.saveOtp(request.getEmail(), otp);

        String subject = "Your OTP Code";
        String content = String.format(
                "<p>Xin chào " +user.getName()+ ",</p>"+
                        "<p>Chúng tôi nhận được yêu cầu reset password. Sử dụng OTP này reset:</p>" +
                        "<h2>%s</h2>" +
                        "<p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>" +
                        "<p>Trân trọng,<br/>NailLaBox</p>",
                otp
        );
        mailService.sendMail(List.of(request.getEmail()), subject, content, null);
    }

    @Override
    public void resetPassword(PasswordCreationRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        String storeOtp = otpService.getOtp(request.getEmail());

        if (storeOtp == null || !storeOtp.equals(request.getOtp())) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        otpService.deleteOtp(request.getEmail());
        userRepository.save(user);
    }

    private static String generateOtp() {
        Random random = new Random();
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }

}
