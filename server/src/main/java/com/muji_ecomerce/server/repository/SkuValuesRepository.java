package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Sku_values;
import com.muji_ecomerce.server.utils.Sku_Values_Key;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SkuValuesRepository extends JpaRepository<Sku_values,Sku_Values_Key> {

}
