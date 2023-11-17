package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;


@Entity
@Getter
@Setter
public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long orderId;

    private String orderDate;

    private String requiredDate;

    private String shippedDate;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="status_order_id")
    private Status status_order;

    @OneToMany(mappedBy = "orderProduct",cascade=CascadeType.ALL)
    @JsonIgnore
    private Set<OrderDetail> productSet;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "shipping_type_id")
    private ShippingType shippingType;


    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "employee_id")
    private Employee employee;

}
