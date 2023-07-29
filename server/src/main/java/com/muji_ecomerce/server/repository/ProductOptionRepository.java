package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Product;
import com.muji_ecomerce.server.entity.Product_Option;
import com.muji_ecomerce.server.utils.Product_Option_Key;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductOptionRepository extends JpaRepository<Product_Option, Product_Option_Key> {

}
