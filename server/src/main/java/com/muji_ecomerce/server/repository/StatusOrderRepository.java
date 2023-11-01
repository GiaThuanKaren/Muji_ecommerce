package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StatusOrderRepository extends JpaRepository<Status,Long> {
    Optional<Status> findByNameStatus(String name);

}
