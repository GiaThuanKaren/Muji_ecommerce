package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Status {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long statusId;

    private String nameStatus;
    @JsonIgnore
    @OneToMany(mappedBy = "status_order",cascade=CascadeType.ALL)
    private List<OrderProduct> order_Product_statuses;
}
