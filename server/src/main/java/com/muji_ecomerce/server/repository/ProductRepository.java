package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {
    List<Product> findByCategoriesCatorgoryID(Long categoriesId);



    @Query(value = "select * from option_value , sku_values where  sku_values.product_id = option_value.product_id and option_value.option_id = 2 and  option_value.product_id = :productid and option_value.value_id = sku_values.values_id ",nativeQuery = true)
    List<Map<String,Object>> getAllOptonValueByIdProductAndSkuId(@Param("productid") Long productId);


}
