package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Customer;
import com.muji_ecomerce.server.model.ResponeModelJson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
    @Query(value = "select * from verification_token_customer,customer where verification_token_customer.customer_id = customer.customer_id and  customer.customer_email = :email" ,nativeQuery = true)
    List<Map<String,Object>> findTokenByEmailCustomer(@Param("email") String email);

    Optional<Customer> findByCustomerEmail(String email);
}
