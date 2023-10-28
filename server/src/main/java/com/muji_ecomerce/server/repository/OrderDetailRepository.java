package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.OrderDetail;
import com.muji_ecomerce.server.utils.Order_Product_Key;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Order_Product_Key> {
}
