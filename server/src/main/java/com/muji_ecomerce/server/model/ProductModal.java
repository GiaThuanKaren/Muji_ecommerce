package com.muji_ecomerce.server.model;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ProductModal {
    private Long productId;

    private String nameProduct;
    private int quantityStock;

    private String productDescription;

    private Long categories_id;

    private List<Long> list_option;

    @Override
    public String toString() {
        return "ProductModal{" +
                "productId=" + productId +
                ", nameProduct='" + nameProduct + '\'' +
                ", quantityStock=" + quantityStock +
                ", productDescription='" + productDescription + '\'' +
                ", categories_id=" + categories_id +
                ", list_option=" + list_option +
                '}';
    }
}
