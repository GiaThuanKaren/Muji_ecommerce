package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.ProductLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductLineRepository extends JpaRepository<ProductLine,Long> {
}
