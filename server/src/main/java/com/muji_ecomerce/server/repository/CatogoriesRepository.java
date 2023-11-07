package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Categories;
import com.muji_ecomerce.server.entity.ProductLine;
import com.muji_ecomerce.server.model.ResponeModelJson;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CatogoriesRepository extends JpaRepository<Categories,Long> {
    @Query( value = "Select * from categories, product_line where categories.productline_id = product_line.product_line_id",nativeQuery = true)
    @Override
    List<Categories> findAll();
}
