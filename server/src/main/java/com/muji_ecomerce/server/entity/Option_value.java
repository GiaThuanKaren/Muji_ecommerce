package com.muji_ecomerce.server.entity;

import com.muji_ecomerce.server.utils.Option_Value_Key;
import jakarta.persistence.*;

@Entity
public class Option_value {

    @EmbeddedId
    Option_Value_Key id;

    private String valuesName;
//
//
    @ManyToOne
    @MapsId("optionID")
    @JoinColumn(name = "option_id")
    Option option1;


}
