package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ProductLine {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productLineId;

    private String nameProductLine;


    private String imageProductLine;

    @OneToMany(mappedBy = "productLine")
    @JsonIgnore
    private List<Categories> categoriesList;

    public ProductLine(Long productLineId, String nameProductLine, String imageProductLine) {
        this.productLineId = productLineId;
        this.nameProductLine = nameProductLine;
        this.imageProductLine = imageProductLine;
    }



    @Override
    public String toString() {
        return "ProductLine{" +
                "productLineId=" + productLineId +
                ", nameProductLine='" + nameProductLine + '\'' +
                ", imageProductLine='" + imageProductLine + '\'' +
                '}';
    }

    public Long getProductLineId() {
        return productLineId;
    }

    public void setProductLineId(Long productLineId) {
        this.productLineId = productLineId;
    }

    public String getNameProductLine() {
        return nameProductLine;
    }

    public void setNameProductLine(String nameProductLine) {
        this.nameProductLine = nameProductLine;
    }

    public String getImageProductLine() {
        return imageProductLine;
    }

    public void setImageProductLine(String imageProductLine) {
        this.imageProductLine = imageProductLine;
    }
}
