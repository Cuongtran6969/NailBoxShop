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

    @Query(value = "SELECT o.product_id, SUM(o.quantity) AS quantity " +
            "FROM order_items o " +
            "WHERE o.create_at BETWEEN :startDate AND :endDate " +
            "GROUP BY o.product_id " +
            "ORDER BY quantity DESC " +
            "LIMIT :limit", nativeQuery = true)
    List<Object[]> findTopSellingProducts(@Param("startDate") LocalDateTime startDate,
                                                @Param("endDate") LocalDateTime endDate,
                                                @Param("limit") int limit);

    @Query("SELECT oi FROM OrderItem oi WHERE oi.order.id = :orderId")
    List<OrderItem> findByOrderIds(@Param("orderId") Long orderId);
}
