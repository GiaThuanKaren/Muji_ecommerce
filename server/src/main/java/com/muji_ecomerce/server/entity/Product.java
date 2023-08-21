package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
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
//    @JsonIgnore
    @JoinColumn(name="category_id")
    private Categories categories;

    @OneToMany(mappedBy = "product",cascade=CascadeType.ALL)

    List<Product_Option> products;

    @OneToMany(mappedBy = "product",cascade=CascadeType.ALL)
//    @JsonIgnore
    List<Product_Sku> productSkus;

    @OneToMany(mappedBy = "product",cascade=CascadeType.ALL)
//    @JsonIgnore
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
