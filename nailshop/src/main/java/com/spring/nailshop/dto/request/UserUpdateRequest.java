package com.spring.nailshop.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.spring.nailshop.validator.PhoneNumber;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserUpdateRequest {
    @NotBlank(message = "FIRST_NAME_NOT_BLANK")
    String firstName;

    @NotBlank(message = "LAST_NAME_NOT_BLANK")
    String lastName;

    @PhoneNumber
    String phone;
}
