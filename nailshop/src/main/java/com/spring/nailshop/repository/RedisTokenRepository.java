package com.spring.nailshop.repository;

import com.spring.nailshop.model.RedisToken;
import org.springframework.data.repository.CrudRepository;

public interface RedisTokenRepository extends CrudRepository<RedisToken, String> {
}
