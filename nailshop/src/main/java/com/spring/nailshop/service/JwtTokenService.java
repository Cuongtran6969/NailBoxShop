package com.spring.nailshop.service;

import com.spring.nailshop.entity.Token;

public interface JwtTokenService {
    boolean save(Token token);
}
