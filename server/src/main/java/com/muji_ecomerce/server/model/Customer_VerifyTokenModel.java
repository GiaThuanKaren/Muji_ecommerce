package com.muji_ecomerce.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer_VerifyTokenModel {
    private String password;
    private String token;

    private String expirationDate;

    private String customerEmail;

    private Boolean enableStatus;

    private Long verificationTokenCustomerid;

    private String customerLastName;

    private Long customerId;

    private String customerFirstName;

    private String customerPhone;
}
