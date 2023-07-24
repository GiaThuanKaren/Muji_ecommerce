package com.muji_ecomerce.server.entity;

import jakarta.persistence.*;



@Entity
public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long orderId;

    private String orderDate;

    private String requiredDate;

    private String shippedDate;

    @ManyToOne
    @JoinColumn(name="status_order_id")
    private Status status_order;

}
