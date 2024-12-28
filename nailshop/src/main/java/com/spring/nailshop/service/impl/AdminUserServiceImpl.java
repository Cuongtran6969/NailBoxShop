package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.UserMapper;
import com.spring.nailshop.repository.UserRepository;
import com.spring.nailshop.repository.specification.UserSpecification;
import com.spring.nailshop.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public PageResponse<List<UserResponse>> searchUser(Pageable pageable, String keyword) {
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
    public UserResponse getUserInfo(Long userId) {
        return userMapper.toUserResponse(userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
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


