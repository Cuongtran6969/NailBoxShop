package com.spring.nailshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShopResponse {
    String name;
    String shop_id;
    String token;
    String description;
    String phone;
    Integer province_id;
    String province_name;
    Integer district_id;
    String district_name;
    String ward_code;
    String ward_name;
    String bank_code;
    String bank_name;
    String bank_account_name;
    Integer boxLength;
    Integer boxWidth;
    Integer boxHeight;
    Integer boxWeight;
    String banners;
}
