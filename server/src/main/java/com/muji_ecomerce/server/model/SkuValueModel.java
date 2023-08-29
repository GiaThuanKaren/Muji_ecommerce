package com.muji_ecomerce.server.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SkuValueModel {
        private Long productId;

    private Long skuId;

    private Long optionId;

    private Long valuesId;

    @Override
    public String toString() {
        return "SkuValueModel{" +
                "productId=" + productId +
                ", skuId=" + skuId +
                ", optionId=" + optionId +
                ", valuesId=" + valuesId +
                '}';
    }
}
