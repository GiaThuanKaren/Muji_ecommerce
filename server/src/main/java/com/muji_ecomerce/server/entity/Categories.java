package com.muji_ecomerce.server.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Categories {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long catorgoryID;

    private String nameCategory;

    private String parentID;
    @ManyToOne
    @JoinColumn(name="productline_id")
    private ProductLine  productLine;

    @OneToMany(mappedBy = "categories")
    private List<Product> productList;


}
