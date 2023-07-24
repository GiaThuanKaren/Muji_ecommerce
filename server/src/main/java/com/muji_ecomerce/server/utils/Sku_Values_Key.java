package com.muji_ecomerce.server.utils;


import com.muji_ecomerce.server.entity.Product_Sku;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class Sku_Values_Key implements Serializable {

    @Column(name = "product_id")
    private Long productId;

//    @ManyToOne
//    @JoinColumn(name = "p")
//    Product_Sku productSku;

    @Column(name = "sku_id")
    private Long skuId;

    @Column(name = "optionId")
    private Long optionId;

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
        return Objects.equals(productId, that.productId) && Objects.equals(skuId, that.skuId) && Objects.equals(optionId, that.optionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, skuId, optionId);
    }
}
