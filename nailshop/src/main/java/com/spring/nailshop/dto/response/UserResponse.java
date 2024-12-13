package com.spring.nailshop.dto.response;

import com.spring.nailshop.entity.Address;
import com.spring.nailshop.entity.Role;
import com.spring.nailshop.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.mapstruct.Mapping;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    Long id;
    String email;
    String name;
    String firstName;
    String lastName;
    String phone;
    String status;
    String role;
    List<AddressResponse> addresses;
}
