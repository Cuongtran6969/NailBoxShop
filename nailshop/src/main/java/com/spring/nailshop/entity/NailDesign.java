package com.spring.nailshop.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.Length;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "nail_design")
public class NailDesign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Length(max = 1000)
    private String images;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nailCategory_id")
    private NailCategory nailCategory;
}
