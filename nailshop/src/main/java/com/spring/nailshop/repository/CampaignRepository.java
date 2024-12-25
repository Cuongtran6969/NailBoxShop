package com.spring.nailshop.repository;

import com.spring.nailshop.entity.Campaign;
import com.spring.nailshop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long>, JpaSpecificationExecutor<Campaign> {
}
