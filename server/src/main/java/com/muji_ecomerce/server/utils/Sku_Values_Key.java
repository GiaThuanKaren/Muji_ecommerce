package com.muji_ecomerce.server.utils;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public class Sku_Values_Key {

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "sku_id")
    private Long skuId;

    @Column(name = "optionId")
    private Long optionId;

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
