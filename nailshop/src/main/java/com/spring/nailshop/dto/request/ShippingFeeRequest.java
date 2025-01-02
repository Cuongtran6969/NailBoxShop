package com.spring.nailshop.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShippingFeeRequest {
    private Integer service_type_id;
    private Integer from_district_id;
    private String from_ward_code;
    private Integer to_district_id;
    private String to_ward_code;
    private Integer length;
    private Integer width;
    private Integer height;
    private Integer weight;
    private Integer insurance_value;
}
