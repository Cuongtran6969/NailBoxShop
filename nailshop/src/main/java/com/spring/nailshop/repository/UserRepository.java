package com.spring.nailshop.repository;

import com.spring.nailshop.entity.Order;
import com.spring.nailshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    Optional<User> findByEmail(String email);

    @Query("SELECT count(u.id) FROM User u WHERE u.createAt BETWEEN :startDate AND :endDate")
    Long findNumberUsersRegister(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}
