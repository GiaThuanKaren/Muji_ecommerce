package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.OrderProduct;
import com.muji_ecomerce.server.model.ResponeModelJson;
import jakarta.persistence.criteria.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderProduct,Long> {

}
