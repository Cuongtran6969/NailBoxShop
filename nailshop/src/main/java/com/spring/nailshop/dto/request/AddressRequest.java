package com.spring.nailshop.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressRequest {
    String province;
    String district;
    String ward;
    String detail;
}
