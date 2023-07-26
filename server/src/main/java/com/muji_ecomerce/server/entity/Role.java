package com.muji_ecomerce.server.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long roleId;


    private String role_name;


    @OneToMany(mappedBy = "roleid")
    private List<Employee> employeeList;
}
