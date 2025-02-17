package com.spring.nailshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NailCateResponse {
    Integer id;
    String name;
    String image;
}
