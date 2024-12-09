package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.UserCreationRequest;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;


public interface UserService {
    List<UserResponse> getAllUsers();

    User createUser(UserCreationRequest request);
}
