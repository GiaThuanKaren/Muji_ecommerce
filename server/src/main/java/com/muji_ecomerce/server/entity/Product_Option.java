package com.muji_ecomerce.server.entity;

import com.muji_ecomerce.server.utils.Product_Option_Key;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Product_Option {

    @EmbeddedId
    Product_Option_Key id;

    @ManyToOne(cascade=CascadeType.ALL)
    @MapsId("productID")
    @JoinColumn(name = "product_id")
    Product product;

    @ManyToOne(cascade=CascadeType.ALL)
    @MapsId("optionId")
    @JoinColumn(name = "option_id")
    Option option;
}
