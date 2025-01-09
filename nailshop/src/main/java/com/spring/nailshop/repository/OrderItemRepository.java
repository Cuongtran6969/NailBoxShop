package com.spring.nailshop.repository;

import com.spring.nailshop.dto.response.ProductRevenueResponse;
import com.spring.nailshop.entity.OrderItem;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderId(Long orderId);

    @Query("SELECT oi.product.id, SUM(oi.quantity) " +
            "FROM OrderItem oi " +
            "WHERE oi.createAt BETWEEN :startDate AND :endDate " +
            "GROUP BY oi.product.id " +
            "ORDER BY SUM(oi.quantity) DESC")
    List<Object[]> findTopSellingProducts(@Param("startDate") LocalDateTime startDate,
                                          @Param("endDate") LocalDateTime endDate,
                                          Pageable pageable);
}
