package com.muji_ecomerce.server.entity;

import com.muji_ecomerce.server.utils.Option_Value_Key;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
public class Option_value {

    @EmbeddedId
    Option_Value_Key id;

    private String valuesName;

    @OneToMany(mappedBy = "valuesId", cascade = CascadeType.ALL)
    private List<Sku_values> skuValuesSet;

//
//
    @ManyToOne
    @MapsId("optionID")
    @JoinColumn(name = "option_id")
    Option option1;


}
