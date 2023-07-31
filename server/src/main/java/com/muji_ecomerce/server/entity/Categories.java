package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
public class Categories {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long catorgoryID;

    private String nameCategory;
    @ManyToOne
    @Nullable
    @JoinColumn(name = "parent_id")
    private Categories parentID;

    @OneToMany(mappedBy = "parentID",cascade=CascadeType.ALL)
    @JsonIgnore
    private Set<Categories> categoriesSet;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="productline_id")
    private ProductLine  productLine;

    @OneToMany(mappedBy = "categories",cascade=CascadeType.ALL)

    private List<Product> productList;


}
