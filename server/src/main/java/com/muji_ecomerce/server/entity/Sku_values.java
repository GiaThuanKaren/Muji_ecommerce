package com.muji_ecomerce.server.entity;

import com.muji_ecomerce.server.utils.Sku_Values_Key;
import jakarta.persistence.*;

@Entity
public class Sku_values {
    @EmbeddedId
    Sku_Values_Key id;

    @Column(name = "values_id")
    private Long valuesId;


    @ManyToOne
    @MapsId("id")
//
    @JoinColumns({
            @JoinColumn(name = "product_id", referencedColumnName = "product_id"),
            @JoinColumn(name = "sku_id", referencedColumnName = "sku_id")
    })
    Product_Sku productSku;

    @ManyToOne
    @MapsId("optionID")
            @JoinColumn(name = "option_id")
    Option option;


//    @ManyToOne
//
//    product_option Productoption;


//    @ManyToOne
//    @JoinColumns({
//            @JoinColumn(name = "product_id", referencedColumnName = "product_id"),
////            @JoinColumn(name = "sku_id", referencedColumnName = "sku_id")
//    })
////////    @ManyToOne
////////    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
//    Product_Sku productSku;


//    Product_Sku productSku;

}
