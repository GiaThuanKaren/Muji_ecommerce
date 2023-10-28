package com.muji_ecomerce.server.entity;

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
    @JoinColumn(name="status_order_id")
    private Status status_order;

    @OneToMany(mappedBy = "orderProduct",cascade=CascadeType.ALL)
    private Set<OrderDetail> productSet;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "shipping_type_id")
    private ShippingType shippingType;

}
