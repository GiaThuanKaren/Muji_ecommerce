package com.muji_ecomerce.server.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductLineModel {
    private Long productLineId;

    private String nameProductLine;


    private String imageProductLine;

    @Override
    public String toString() {
        return "ProductLineModel{" +
                "productLineId=" + productLineId +
                ", nameProductLine='" + nameProductLine + '\'' +
                ", imageProductLine='" + imageProductLine + '\'' +
                '}';
    }
}
