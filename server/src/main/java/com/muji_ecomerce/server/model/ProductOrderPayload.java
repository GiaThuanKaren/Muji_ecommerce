package com.muji_ecomerce.server.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductOrderPayload{
    private Long  skuId;
    private Long productId;

    private int quantity;

    private Long optionId;

    private Long valuesId;

}