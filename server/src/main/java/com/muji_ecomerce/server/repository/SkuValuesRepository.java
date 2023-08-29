package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Sku_values;
import com.muji_ecomerce.server.utils.Sku_Values_Key;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkuValuesRepository extends JpaRepository<Sku_values,Sku_Values_Key> {
}
