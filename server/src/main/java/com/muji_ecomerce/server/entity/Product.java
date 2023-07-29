package com.muji_ecomerce.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Setter
@Getter
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

    @OneToMany(mappedBy = "product",cascade=CascadeType.ALL)
    Set<Product_Option> products;

    @OneToMany(mappedBy = "product",cascade=CascadeType.ALL)
    Set<Product_Sku> productSkus;

    @OneToMany(mappedBy = "product",cascade=CascadeType.ALL)
    Set<OrderDetail> orderProducts;

    @Override
    public String toString() {
        return "Product{" +
                "productId=" + productId +
                ", nameProduct='" + nameProduct + '\'' +
                ", quantityStock=" + quantityStock +
                ", productDescription='" + productDescription + '\'' +
                ", categories=" + categories +
                ", products=" + products +
                ", productSkus=" + productSkus +
                ", orderProducts=" + orderProducts +
                '}';
    }
}
