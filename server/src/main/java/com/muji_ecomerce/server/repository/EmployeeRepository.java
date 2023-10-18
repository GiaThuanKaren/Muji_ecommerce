package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {

    Employee findByEmployeeEmail(String email);
}
