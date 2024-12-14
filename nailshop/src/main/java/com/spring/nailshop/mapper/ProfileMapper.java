package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.UserUpdateRequest;
import com.spring.nailshop.dto.response.UserUpdateResponse;
import com.spring.nailshop.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    void updateUser(UserUpdateRequest request, @MappingTarget User user);

    UserUpdateResponse toUserUpdateResponse(User user);
}
