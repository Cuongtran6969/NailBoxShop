package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.UserCreationRequest;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);
    UserResponse toUserResponse(User user);
}
