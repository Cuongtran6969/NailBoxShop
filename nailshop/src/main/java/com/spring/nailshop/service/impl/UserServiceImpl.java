package com.spring.nailshop.service.impl;

import com.spring.nailshop.entity.User;
import com.spring.nailshop.repository.UserRepository;
import com.spring.nailshop.security.AuthUser;
import com.spring.nailshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDetailsService userDetailsService() {
        return username -> {
            User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
            return new AuthUser(user);
        };
    }

}
