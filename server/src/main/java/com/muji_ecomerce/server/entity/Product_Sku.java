package com.muji_ecomerce.server.entity;

import com.muji_ecomerce.server.utils.Product_Sku_Key;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Product_Sku {

//    private  Sku_values skuValues12;
    @EmbeddedId
    Product_Sku_Key id;

    private String skuName;

    private float price;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToMany(mappedBy = "productSku", cascade = CascadeType.ALL)
    List<Sku_values> skuValues;

//    @OneToMany(mappedBy = "Productoption", cascade = CascadeType.ALL)
//    List<Sku_values> skuValues1;
//    @OneToMany(mappedBy = "entityA", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<EntityB> entityBs;


}
