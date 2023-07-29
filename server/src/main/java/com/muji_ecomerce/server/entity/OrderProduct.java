package com.muji_ecomerce.server.entity;

import jakarta.persistence.*;

import java.util.Set;


@Entity
public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long orderId;

    private String orderDate;

    private String requiredDate;

    private String shippedDate;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="status_order_id")
    private Status status_order;

    @OneToMany(mappedBy = "orderProduct",cascade=CascadeType.ALL)
    private Set<OrderDetail> productSet;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
