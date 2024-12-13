package com.spring.nailshop.service;

import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.UserResponse;
import org.springframework.data.domain.Pageable;

public interface AdminUserService {
    PageResponse<?> advanceSearchWithSpecifications(Pageable pageable, String[] user, String[] address);
}
