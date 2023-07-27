package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatogoriesRepository extends JpaRepository<Categories,Long> {
}
