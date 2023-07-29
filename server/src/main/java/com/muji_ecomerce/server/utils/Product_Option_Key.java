package com.muji_ecomerce.server.utils;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class Product_Option_Key  implements Serializable {
    @Column(name = "product_id")
    private Long productId;

    @Column(name="option_id")
    private Long optionId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product_Option_Key that = (Product_Option_Key) o;
        return Objects.equals(productId, that.productId) && Objects.equals(optionId, that.optionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, optionId);
    }
}
