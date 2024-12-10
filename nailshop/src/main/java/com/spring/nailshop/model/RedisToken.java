package com.spring.nailshop.model;


import lombok.*;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("RedisToken")
public class RedisToken {
    private String id;

    private String accessToken;

    private String refreshToken;
}
