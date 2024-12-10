package com.spring.nailshop.dto.request;

import com.spring.nailshop.validator.PhoneNumber;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {

    @Email
    String email;

    @Size(min = 6, message = "INVALID_PASSWORD")
    String password;

    @NotBlank(message = "FIRST_NAME_NOT_BLANK")
    String firstName;

    @NotBlank(message = "LAST_NAME_NOT_BLANK")
    String lastName;

    @PhoneNumber
    String phone;
}
