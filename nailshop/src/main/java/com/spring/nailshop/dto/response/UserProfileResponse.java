package com.spring.nailshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProfileResponse {
    Long id;
    String email;
    String name;
    String avatar;
    String firstName;
    String lastName;
    String phone;
}
