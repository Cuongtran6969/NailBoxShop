package com.spring.nailshop.service;

import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.model.RedisToken;
import com.spring.nailshop.repository.RedisTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class RedisTokenService {
    private final RedisTokenRepository redisTokenRepository;

    public void save(RedisToken token) {
        redisTokenRepository.save(token);
    }

    public void remove(String id) {
        isExists(id);
        redisTokenRepository.deleteById(id);
    }

    public RedisToken getById(String id) {
        return redisTokenRepository.findById(id).get();
    }

    public boolean isExists(String id) {
        if (!redisTokenRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }
        return true;
    }
}
