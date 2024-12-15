package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.mapper.UserMapper;
import com.spring.nailshop.repository.SearchRepository;
import com.spring.nailshop.repository.UserRepository;
import com.spring.nailshop.repository.specification.UserSpecificationsBuilder;
import com.spring.nailshop.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static com.spring.nailshop.constant.AppConstant.SEARCH_SPEC_OPERATOR;

import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final SearchRepository searchRepository;

    @Override
    public PageResponse<?> advanceSearchWithSpecifications(Pageable pageable, String[] user, String[] address) {
        log.info("user: {}, address: {}", user, address);
        if (user != null && address != null) {
            return searchRepository.searchUserByCriteriaWithJoin(pageable, user, address);

        } else if (user != null) {
            UserSpecificationsBuilder builder = new UserSpecificationsBuilder();
            Pattern pattern = Pattern.compile(SEARCH_SPEC_OPERATOR);

            for (String u : user) {
                Matcher matcher = pattern.matcher(u);
                if (matcher.find()) {
                    builder.with(matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4), matcher.group(5));
                }
            }
            Page<User> users = userRepository.findAll(Objects.requireNonNull(builder.build()), pageable);
            return convertToPageResponse(users, pageable);
        }
        return convertToPageResponse(userRepository.findAll(pageable), pageable);
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


