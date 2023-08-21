package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @OneToMany(mappedBy = "option",cascade=CascadeType.ALL)
    @JsonIgnore
    Set<Product_Option> options;

    @OneToMany(mappedBy = "option1",cascade=CascadeType.ALL)

    Set<Option_value> optionValues;

    @OneToMany(mappedBy = "option",cascade=CascadeType.ALL)
    @JsonIgnore
    List<Sku_values> skuValues;

}
