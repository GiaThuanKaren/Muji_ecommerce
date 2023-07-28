package com.muji_ecomerce.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long optionID;

    private String optionName;

    @OneToMany(mappedBy = "option")
    Set<product_option> options;

    @OneToMany(mappedBy = "option1")
    Set<Option_value> optionValues;

    @OneToMany(mappedBy = "option")
    List<Sku_values> skuValues;

}
