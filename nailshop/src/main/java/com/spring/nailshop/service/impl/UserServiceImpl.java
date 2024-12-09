package com.spring.nailshop.service.impl;

import com.spring.nailshop.constant.PredefinedRole;
import com.spring.nailshop.dto.request.UserCreationRequest;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.entity.Role;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.mapper.UserMapper;
import com.spring.nailshop.repository.RoleRepository;
import com.spring.nailshop.repository.UserRepository;
import com.spring.nailshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream().map(userMapper::toUserResponse).toList();
    }

    @Override
    public User createUser(UserCreationRequest request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            //throw ex
            throw new UsernameNotFoundException("user invlalid");
        }
        User user = userMapper.toUser(request);
        Role role = roleRepository.findByName(PredefinedRole.USER_ROLE)
                .orElseThrow(() -> new RuntimeException("Role not found"));//throw role not exist

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(role);
        user.setName(request.getFirstName() +" "+request.getLastName());
        userRepository.save(user);
        return null;
    }

}
