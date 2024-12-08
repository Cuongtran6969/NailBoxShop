package com.spring.nailshop.service.impl;

import com.spring.nailshop.entity.Token;
import com.spring.nailshop.repository.TokenRepository;
import com.spring.nailshop.service.JwtTokenService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class JwtTokenServiceImpl implements JwtTokenService {

    TokenRepository tokenRepository;

    @Override
    public boolean save(Token token) {
        return true;
    }
}
