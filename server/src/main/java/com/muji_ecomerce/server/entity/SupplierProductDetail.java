package com.muji_ecomerce.server.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.muji_ecomerce.server.utils.Product_Supplier_Key;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class SupplierProductDetail {
    @EmbeddedId
    private Product_Supplier_Key productSupplierKey;

    @ManyToOne
    @JsonIgnore
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    Product product;

    @ManyToOne
    @JsonIgnore
    @MapsId("supplier_id")
    @JoinColumn(name = "supplier_id")
    Supplier supplier;


}
