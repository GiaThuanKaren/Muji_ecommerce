package com.muji_ecomerce.server.entity;

import com.muji_ecomerce.server.utils.Product_Option_Key;
import jakarta.persistence.*;

@Entity
public class product_option {

    @EmbeddedId
    Product_Option_Key id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    Product product;

    @ManyToOne
    @MapsId("optionId")
    @JoinColumn(name = "option_id")
    Option option;
}
