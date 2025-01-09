package com.spring.nailshop.service;

import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.dto.response.UserSummaryResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AdminUserService {
//    PageResponse<?> advanceSearchWithSpecifications(Pageable pageable, String[] user, String[] address);

    PageResponse<List<UserResponse>> searchUser(Pageable pageable, String keyword);

    void banUser(Long userId);

    void unBanUser(Long userId);

    UserResponse getUserInfo(Long userId);

    UserSummaryResponse getUserSummary(String period);
}
