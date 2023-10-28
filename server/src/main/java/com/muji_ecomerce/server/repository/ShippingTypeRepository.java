package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.ShippingType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShippingTypeRepository extends JpaRepository<ShippingType,Long> {
    Optional<ShippingType> findByName(String name);
}
