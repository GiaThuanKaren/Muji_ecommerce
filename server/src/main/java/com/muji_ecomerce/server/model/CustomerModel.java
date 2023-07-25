package com.muji_ecomerce.server.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerModel {

    private String customerLastName;

    private String customerFirstName;

    private String customerPhone;
    private String customerEmail;

}
