package com.muji_ecomerce.server.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long customerId;

    private String customerLastName;

    private String customerFirstName;

    private String customerPhone;

    private String customerEmail;
    @OneToMany(mappedBy = "customer")
    private List<OrderProduct> orderProducts;

    @OneToOne(mappedBy = "customer")
    private VerificationTokenCustomer verificationTokenCustomer;

}
