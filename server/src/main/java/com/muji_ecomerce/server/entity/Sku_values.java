package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.muji_ecomerce.server.utils.Sku_Values_Key;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter

public class Sku_values {
    @EmbeddedId
    Sku_Values_Key id;

    @ManyToOne
    @MapsId("id")
//@JsonIgnore
   @JoinColumns({
           @JoinColumn(name = "values_id", referencedColumnName ="value_id"),
           @JoinColumn(name = "product_id", referencedColumnName = "product_id"),
           @JoinColumn(name = "option_id", referencedColumnName ="option_id")
   }
   )


    private Option_value valuesId;




    @ManyToOne
//    @JsonIgnore

    @MapsId("id")
    @JoinColumns({
            @JoinColumn(name = "product_id", referencedColumnName = "product_id"),
            @JoinColumn(name = "sku_id", referencedColumnName = "sku_id")
    })
    Product_Sku productSku;

    @ManyToOne


    @MapsId("optionID")
            @JoinColumn(name = "option_id")
    Option option;



//    private int quantity;



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
