package com.spring.nailshop.service.impl;

import com.spring.nailshop.constant.PredefinedRole;
import com.spring.nailshop.dto.request.UserUpdateRequest;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.dto.response.UserSummaryResponse;
import com.spring.nailshop.entity.Role;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.UserMapper;
import com.spring.nailshop.model.TimeRange;
import com.spring.nailshop.repository.RoleRepository;
import com.spring.nailshop.repository.UserRepository;
import com.spring.nailshop.repository.specification.UserSpecification;
import com.spring.nailshop.service.AdminUserService;
import com.spring.nailshop.service.CloudinaryService;
import com.spring.nailshop.util.TimeRangeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RoleRepository roleRepository;
    private final CloudinaryService cloudinaryService;

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public PageResponse<List<UserResponse>> searchUser(Pageable pageable, String keyword) {
        log.info("get info here");
        Specification<User> spec = UserSpecification.containsKeyword(keyword);

        Page<User> userPage = userRepository.findAll(spec, pageable);

        List<UserResponse> userResponses = userPage.stream()
                .map(this::convertToUserResponse)
                .toList();

        return PageResponse.<List<UserResponse>>builder()
                .items(userResponses)
                .page(pageable.getPageNumber() + 1)
                .total(userPage.getTotalElements())
                .totalPages(userPage.getTotalPages())
                .build();
    }

    private UserResponse convertToUserResponse(User user) {
        return userMapper.toUserResponse(user);
    }

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public void banUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (user.getEnabled() != null && !user.getEnabled()) {
            throw new AppException(ErrorCode.USER_ALREADY_BANNED);
        }

        user.setEnabled(false); // Vô hiệu hóa tài khoản
        userRepository.save(user);
    }

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public void unBanUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (user.getEnabled() != null && user.getEnabled()) {
            throw new AppException(ErrorCode.USER_NOT_BANNED);
        }

        user.setEnabled(true); // Kích hoạt lại tài khoản
        userRepository.save(user);
    }

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public UserResponse getUserInfo(Long userId) {
        return userMapper.toUserResponse(userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }

    @Override
    public UserSummaryResponse getUserSummary(String period) {
        TimeRange currentRange = TimeRangeUtil.getTimeRange(period);
        TimeRange previousRange = TimeRangeUtil.getPreviousTimeRange(period);
        log.info("currentRange: "+currentRange.getStartDate()+"/"+currentRange.getEndDate());
        log.info("previousRange: "+previousRange.getStartDate()+"/"+previousRange.getEndDate());
        Long currentUser = userRepository.findNumberUsersRegister(currentRange.getStartDate(), currentRange.getEndDate());
        Long previousUser = userRepository.findNumberUsersRegister(previousRange.getStartDate(), previousRange.getEndDate());

        return UserSummaryResponse.builder()
                .currentTotalUsers(currentUser)
                .previousTotalUsers(previousUser)
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public UserResponse updateUser(UserUpdateRequest request, MultipartFile file) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED));
        if (file != null && !file.isEmpty()) {
            String avatar = cloudinaryService.uploadImage(file);
            user.setAvatar(avatar);
        }
        user.setRole(role);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setName(request.getFirstName() +" " + request.getLastName());
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    private PageResponse<?> convertToPageResponse(Page<User> users, Pageable pageable) {
        List<UserResponse> response = users.stream().map(userMapper::toUserResponse).toList();
        return PageResponse.builder()
                .page(pageable.getPageNumber()+1)
                .size(pageable.getPageSize())
                .total(users.getTotalElements())
                .items(response)
                .build();
    }
}


