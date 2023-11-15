package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.SupplierProductDetail;
import com.muji_ecomerce.server.utils.Product_Supplier_Key;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierProductRepository extends JpaRepository<SupplierProductDetail, Product_Supplier_Key> {
}
