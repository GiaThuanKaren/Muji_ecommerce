package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long supplier_id;

    private String supplier_name;

    private String supplier_address;

    @OneToMany(mappedBy = "supplier",cascade = CascadeType.ALL)
    @JsonIgnore
    Set<SupplierProductDetail> supplier_list;
}
