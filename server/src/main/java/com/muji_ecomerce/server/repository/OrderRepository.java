package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.OrderProduct;
import com.muji_ecomerce.server.model.ResponeModelJson;
import jakarta.persistence.criteria.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderProduct,Long> {
    @Query(value = "select * from order_product ,order_detail where order_product.order_id = order_detail.order_id and order_product.order_id = :idorder" ,nativeQuery = true)
    List<Map<String,Object>> findAllOrderAndOrderDetailById(@Param("idorder") Long orderId);



    @Query(value = "select * from customer , order_product where order_product.customer_id = customer.customer_id and customer.customer_id = :idcustomer",nativeQuery = true)
    List<Map<String,Object>> findAllOrderByIdCustomer(@Param("idcustomer") Long customerId);
}
