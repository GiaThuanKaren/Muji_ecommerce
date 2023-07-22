package com.muji_ecomerce.server.entity;

import com.muji_ecomerce.server.utils.Sku_Values_Key;
import jakarta.persistence.*;

@Entity
public class Sku_values {
    @EmbeddedId
    Sku_Values_Key id;

    private Long valuesId;



    @ManyToOne
//    @MapsId("id")
//    @JoinColumn(name = "product_sku_id")
//    @JoinColumns({
//            @JoinColumn(name = "product_id_1", referencedColumnName = "product_id"),
//            @JoinColumn(name = "sku_id_1", referencedColumnName = "sku_id")
//    })
    Product_Sku productSku;

}
