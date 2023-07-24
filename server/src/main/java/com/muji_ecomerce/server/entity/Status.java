package com.muji_ecomerce.server.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Status {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long statusId;

    private String nameStatus;

    @OneToMany(mappedBy = "status_order")
    private List<OrderProduct> order_Product_statuses;
}
