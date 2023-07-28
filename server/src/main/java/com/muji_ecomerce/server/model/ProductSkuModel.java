package com.muji_ecomerce.server.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ProductSkuModel {
    private Long product_id;

    private Long sku_id;

    private float price;

    private String sku_name;

    @Override
    public String toString() {
        return "ProductSkuModel{" +
                "product_id=" + product_id +
                ", sku_id=" + sku_id +
                ", price=" + price +
                ", sku_name='" + sku_name + '\'' +
                '}';
    }
}
