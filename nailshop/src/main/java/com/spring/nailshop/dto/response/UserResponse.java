package com.spring.nailshop.dto.response;

import com.spring.nailshop.entity.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String email;
    private String firstName;
    private String lastName;
    private String userName;
    private String phone;
    private Role role;
}
