package com.spring.nailshop.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(mappedBy = "payment", cascade = CascadeType.ALL)
    private Order order;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;
}
