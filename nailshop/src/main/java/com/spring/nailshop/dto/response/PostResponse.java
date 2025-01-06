package com.spring.nailshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {
     Integer id;
     String image;
     String title;
     String description;
     String content;
     LocalDateTime createAt;
}
