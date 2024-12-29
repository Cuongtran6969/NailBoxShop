package com.spring.nailshop.repository;

import com.spring.nailshop.entity.Address;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    @Query("SELECT address FROM Address address WHERE address.user.id = :userId ORDER BY address.updateAt DESC")
    List<Address> findAddressByUserId(Long userId);

    @Query("SELECT count(address.id) FROM Address address WHERE address.user.id = :userId")
    int countAddressesByUserId(Long userId);
}
