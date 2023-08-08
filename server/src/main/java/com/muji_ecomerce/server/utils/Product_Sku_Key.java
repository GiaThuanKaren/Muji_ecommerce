package com.muji_ecomerce.server.utils;

import com.muji_ecomerce.server.entity.Sku_values;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Embeddable
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Product_Sku_Key implements Serializable {
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "sku_id")

    private Long skuId;


//    @OneToMany(mappedBy = "productSku", cascade = CascadeType.ALL)
//    List<Sku_values> skuValues;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product_Sku_Key that = (Product_Sku_Key) o;
        return Objects.equals(productId, that.productId) && Objects.equals(skuId, that.skuId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, skuId);
    }
}
