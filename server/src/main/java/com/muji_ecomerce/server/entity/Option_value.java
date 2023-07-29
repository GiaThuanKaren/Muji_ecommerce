package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.muji_ecomerce.server.utils.Option_Value_Key;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Option_value {

    @EmbeddedId
    Option_Value_Key id;

    private String valuesName;

    @OneToMany(mappedBy = "valuesId", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Sku_values> skuValuesSet;

//
//
    @ManyToOne(cascade=CascadeType.ALL)

    @MapsId("optionID")
    @JoinColumn(name = "option_id")
    Option option1;


}
