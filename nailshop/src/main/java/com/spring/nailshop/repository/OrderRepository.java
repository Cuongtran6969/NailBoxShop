package com.spring.nailshop.repository;

import com.spring.nailshop.entity.Coupon;
import com.spring.nailshop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByCode(String code);
}
