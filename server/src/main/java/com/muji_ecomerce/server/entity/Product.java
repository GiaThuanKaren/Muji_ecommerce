package com.muji_ecomerce.server.entity;

import com.muji_ecomerce.server.utils.Order_Product_Key;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productId;

    private String nameProduct;
    private int quantityStock;

    private String productDescription;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Categories categories;

    @OneToMany(mappedBy = "product")
    Set<product_option> products;

    @OneToMany(mappedBy = "product")
    Set<Product_Sku> productSkus;

    @OneToMany(mappedBy = "product")
    Set<OrderDetail> orderProducts;
}
