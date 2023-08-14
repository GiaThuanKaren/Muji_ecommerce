package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.VerificationTokenCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerifyTokenRepository extends JpaRepository<VerificationTokenCustomer,Long> {
    VerificationTokenCustomer findByToken(String Token);
}
