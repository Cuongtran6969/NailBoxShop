package com.spring.nailshop.repository;

import com.spring.nailshop.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Long> {
}
