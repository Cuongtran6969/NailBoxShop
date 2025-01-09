package com.spring.nailshop.repository;

import com.spring.nailshop.dto.response.RevenueData;
import com.spring.nailshop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    Optional<Order> findByCode(String code);

    @Query("SELECT o FROM Order o WHERE o.createAt BETWEEN :startDate AND :endDate")
    List<Order> findOrdersByPeriod(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.createAt BETWEEN :startDate AND :endDate")
    BigDecimal getRevenue(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT new com.spring.nailshop.dto.response.RevenueData(" +
            "CAST(o.createAt AS DATE), SUM(o.totalPrice)) " +
            "FROM Order o WHERE o.createAt BETWEEN :startDate AND :endDate " +
            "GROUP BY CAST(o.createAt AS DATE) ORDER BY CAST(o.createAt AS DATE)")
    List<RevenueData> findRevenueBetweenDates(@Param("startDate") LocalDateTime startDate,
                                              @Param("endDate") LocalDateTime endDate);

}
