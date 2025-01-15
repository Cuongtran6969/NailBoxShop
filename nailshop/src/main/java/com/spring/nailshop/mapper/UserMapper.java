package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.UserCreationRequest;
import com.spring.nailshop.dto.request.UserInfoUpdateRequest;
import com.spring.nailshop.dto.request.UserUpdateRequest;
import com.spring.nailshop.dto.response.UserProfileResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    void updateUser(UserUpdateRequest request, @MappingTarget User user);

    UserProfileResponse toProfileResponse(User user);
}
