package com.muji_ecomerce.server.utils;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class Product_Sku_Key implements Serializable {
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "sku_id")
    private Long skuId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product_Sku_Key that = (Product_Sku_Key) o;
        return Objects.equals(productId, that.productId) && Objects.equals(skuId, that.skuId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, skuId);
    }
}
