package com.muji_ecomerce.server.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long customerId;

    private String customerLastName;

    private String customerFirstName;

    private String customerPhone;

    @OneToMany(mappedBy = "customer")
    private List<OrderProduct> orderProducts;


}
