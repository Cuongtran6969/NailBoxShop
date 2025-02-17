package com.spring.nailshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "nail_category")
public class NailCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String image;

    @OneToMany(mappedBy = "nailCategory")
    @JsonIgnore
    private Set<NailDesign> nailDesigns;
}
