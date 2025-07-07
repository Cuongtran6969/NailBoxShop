package com.spring.nailshop.repository;

import com.spring.nailshop.entity.NailCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NailCategoryRepository extends JpaRepository<NailCategory, Integer> {
}
