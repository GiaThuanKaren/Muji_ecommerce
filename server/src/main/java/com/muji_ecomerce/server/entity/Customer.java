package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

@Entity
@Getter
@Setter
public class Customer {
    

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long customerId;

    private String customerLastName;

    private String customerFirstName;

    private String customerPhone;

    private String customerEmail;

    private String password;
    private boolean enableStatus;
    @OneToMany(mappedBy = "customer",cascade=CascadeType.ALL)
    @JsonIgnore
    private List<OrderProduct> orderProducts;

    @OneToOne(mappedBy = "customer",cascade=CascadeType.ALL)
    @JsonIgnore
    private VerificationTokenCustomer verificationTokenCustomer;

}
