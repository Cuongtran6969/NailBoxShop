package com.spring.nailshop.service;

import com.spring.nailshop.model.RedisToken;
import com.spring.nailshop.repository.RedisTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;


@Service
@RequiredArgsConstructor
public class RedisTokenService {
    private final RedisTokenRepository redisTokenRepository;

    public void save(RedisToken token) {
        RedisToken result = redisTokenRepository.save(token);
    }
    public void delete(String id) {
        redisTokenRepository.deleteById(id);
    }

    public RedisToken getById(String id) {
        return redisTokenRepository.findById(id).orElseThrow(() -> new NotFoundException("Token not found"));
    }
}
