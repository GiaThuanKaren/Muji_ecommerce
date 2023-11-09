package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.OrderDetail;
import com.muji_ecomerce.server.utils.Order_Product_Key;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Order_Product_Key> {

}
