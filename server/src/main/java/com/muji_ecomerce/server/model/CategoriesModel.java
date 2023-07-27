package com.muji_ecomerce.server.model;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoriesModel {
    private Long catorgoryID;

    private String nameCategory;

    private Long parentID;

    private Long product_lineid;

    @Override
    public String toString() {
        return "CategoriesModel{" +
                "catorgoryID=" + catorgoryID +
                ", nameCategory='" + nameCategory + '\'' +
                ", parentID=" + parentID +
                ", product_lineid=" + product_lineid +
                '}';
    }
}
