package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByCategoriesCatorgoryID(Long categoriesId);
}
