package com.muji_ecomerce.server.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long employeeId;

    private String employeeFirstName;

    private String employeeLastName;

    private String employeePhone;

    private String employeeAdress;

    @Column(unique = true)
    private String employeeEmail;


    private String employeePassword;
    @ManyToOne
    @JoinColumn(name = "employee_role_id")
    private Role roleid;
}
