package com.spring.nailshop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "product")
public class Product extends AbstractEntity<Long> {
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "stock")// Số lượng sản phẩm trong kho
    private Integer stock=0;

    @Column(name = "sold")// Số lượng sản phẩm đã bán
    private Integer sold=0;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "discount")
    private Integer discount=0;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive = true;

    @Column(name = "pictures", columnDefinition = "TEXT")
    private String pictures;

    @Column(name = "size")
    private String size="";

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "product_category",
              joinColumns = @JoinColumn(name = "product_id"),
             inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "product")
    private Set<Design> designs;

    @ManyToMany(mappedBy = "products")
    private List<Campaign> campaigns;
    @PrePersist
    private void prePersist() {
        if (this.stock == null) {
            stock = 0;
        }
        if (this.discount == null) {
            discount = 0;
        }
        if (this.sold == null) {
            sold = 0;
        }
        if (this.size == null) {
            size = "";
        }
    }
}
