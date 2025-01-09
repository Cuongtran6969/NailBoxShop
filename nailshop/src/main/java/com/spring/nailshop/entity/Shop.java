package com.spring.nailshop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "shop")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String shop_id;

    private String token;

    private String description;

    private String phone;

    private Integer province_id;

    private String province_name;

    private Integer district_id;

    private String district_name;

    private String ward_code;

    private String ward_name;

    private String bank_code;

    private String bank_name;

    private String bank_account_name;

    private Integer boxLength;

    private Integer boxWidth;

    private Integer boxHeight;

    private Integer boxWeight;

    @Column(name = "banners", columnDefinition = "TEXT")
    private String banners;

    private Long visits = 0L;
}
