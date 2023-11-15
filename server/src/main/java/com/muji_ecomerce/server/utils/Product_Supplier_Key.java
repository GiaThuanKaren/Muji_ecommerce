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
public class Product_Supplier_Key implements Serializable {

    @Column(name = "product_id")
    private Long productid;


    @Column(name="supplier_id")
    private Long supplier_id;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product_Supplier_Key that = (Product_Supplier_Key) o;
        return Objects.equals(productid, that.productid) && Objects.equals(supplier_id, that.supplier_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productid, supplier_id);
    }
}
