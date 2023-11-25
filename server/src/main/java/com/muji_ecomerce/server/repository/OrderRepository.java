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


    @Query(value = "select employee.*, count(order_product.employee_id) as total from order_product, employee WHERE order_product.employee_id = employee.employee_id GROUP BY order_product.employee_id ORDER BY total LIMIT 5", nativeQuery = true)
    List<Map<String, Object>> Top5EmployeeSale();

    @Query(value = "select customer.*, count(order_product.customer_id) as total from order_product, customer WHERE order_product.customer_id = customer.customer_id GROUP BY order_product.customer_id ORDER BY total LIMIT 5", nativeQuery = true)
    List<Map<String, Object>> Top5CustomerBuy();




    @Query(value = "select * from customer , order_product where order_product.customer_id = customer.customer_id and customer.customer_id = :idcustomer",nativeQuery = true)
    List<Map<String,Object>> findAllOrderByIdCustomer(@Param("idcustomer") Long customerId);

}
