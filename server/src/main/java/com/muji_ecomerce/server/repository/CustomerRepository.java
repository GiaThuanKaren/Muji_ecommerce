package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
}
