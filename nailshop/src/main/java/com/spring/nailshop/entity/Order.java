package com.spring.nailshop.entity;

import com.spring.nailshop.util.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "orders")
public class Order extends AbstractEntity<Long> {

    @Column(name = "code")
    private String code;

    @Column(name = "receiver_name")
    private String receiver_name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "total_price")
    private Double total_price;

    @Column(name = "to_province_id")
    private Integer province_id;

    @Column(name = "to_district_id")
    private Integer district_id;

    @Column(name = "to_ward_code")
    private Integer ward_code;

    @Column(name = "province_name")
    private String province_name;

    @Column(name = "district_name")
    private String district_name;

    @Column(name = "ward_name")
    private String ward_name;

    @Column(name = "detail")
    private String detail;

    @Column(name = "ship_fee")
    private Integer ship_fee;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "coupon_id", nullable = true)
    private Coupon coupon;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @Column(name = "qr_img")
    private String qr_img;

    @Column(name = "payment_at")
    @CreationTimestamp
    private LocalDateTime paymentAt;

    @Column(name = "cancel_at")
    @CreationTimestamp
    private LocalDateTime cancelAt;

    @Column(name = "complete_at")
    @CreationTimestamp
    private LocalDateTime completeAt;

    public int totalQuantity() {
        if (orderItems == null || orderItems.isEmpty()) {
            return 0;
        }
        return orderItems.stream()
                .mapToInt(OrderItem::getQuantity)
                .sum();
    }
}
