package com.muji_ecomerce.server.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SupplierModel {
    private Long supplier_id;

    private String supplier_name;


    private String supplier_address;

    private List<Long> list_product;

    @Override
    public String toString() {
        return "SupplierModel{" +
                "supplier_id=" + supplier_id +
                ", supplier_name='" + supplier_name + '\'' +
                ", supplier_address='" + supplier_address + '\'' +
                ", list_product=" + list_product +
                '}';
    }
}
