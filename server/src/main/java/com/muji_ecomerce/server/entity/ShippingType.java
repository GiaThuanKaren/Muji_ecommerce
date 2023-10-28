package com.muji_ecomerce.server.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
public class ShippingType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long shippingtypeId;

    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "shippingType")
    private Set<OrderProduct> orderProductSet;
}
