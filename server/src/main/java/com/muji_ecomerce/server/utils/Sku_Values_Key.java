package com.muji_ecomerce.server.utils;


import com.muji_ecomerce.server.entity.Product_Sku;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class Sku_Values_Key implements Serializable {

    @Column(name = "product_id")
    private Long productId;

//    @ManyToOne
//    @JoinColumn(name = "p")
//    Product_Sku productSku;

    @Column(name = "sku_id")
    private Long skuId;

    @Column(name = "option_id")
    private Long optionId;


    @Column(name = "values_id")
    private Long valuesId;


//    @ManyToOne
//
//    @JoinColumns({
//            @JoinColumn(name = "product_id", referencedColumnName = "product_id"),
//            @JoinColumn(name = "sku_id", referencedColumnName = "sku_id")
//    })
//    Product_Sku productSku;

//    @JoinColumns({
//            @JoinColumn(name = "product_id", referencedColumnName = "product_id"),
//            @JoinColumn(name = "sku_id", referencedColumnName = "sku_id")
//    })


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sku_Values_Key that = (Sku_Values_Key) o;
        return Objects.equals(productId, that.productId) && Objects.equals(skuId, that.skuId) && Objects.equals(optionId, that.optionId) && Objects.equals(valuesId, that.valuesId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, skuId, optionId, valuesId);
    }
}
