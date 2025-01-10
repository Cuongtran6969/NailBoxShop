package com.spring.nailshop.dto.response.admin;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Admin_UserResponse {
    Long id;
    String email;
    String name;
    String avatar;
    String firstName;
    String lastName;
    String phone;
    Boolean enabled;
    String role;
}
