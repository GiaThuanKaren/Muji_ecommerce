package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {
    List<Product> findByCategoriesCatorgoryID(Long categoriesId);

    Page<Product> findByNameProductContaining(String _product, Pageable pageable);

    List<Product> findByNameProductContaining(String _product, Sort sort);

}
