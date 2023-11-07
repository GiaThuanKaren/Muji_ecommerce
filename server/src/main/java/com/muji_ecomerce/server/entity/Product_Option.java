package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @ManyToOne
    @JsonIgnore
    @MapsId("productID")
    @JoinColumn(name = "product_id")
    Product product;

    @ManyToOne
    @MapsId("optionId")
    @JoinColumn(name = "option_id")
    Option option;
}
