package com.muji_ecomerce.server.model;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductModal {
    private Long productId;

    private String nameProduct;
    private int quantityStock;

    private String productDescription;

    private Long categories_id;
}
