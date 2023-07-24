package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderProduct,Long> {
}
