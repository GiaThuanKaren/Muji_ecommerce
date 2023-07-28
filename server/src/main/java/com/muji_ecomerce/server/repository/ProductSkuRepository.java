package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Product_Sku;
import com.muji_ecomerce.server.utils.Product_Sku_Key;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductSkuRepository extends JpaRepository<Product_Sku, Product_Sku_Key> {
}
