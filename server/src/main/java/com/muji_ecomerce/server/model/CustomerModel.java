package com.muji_ecomerce.server.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerModel {

    private Long customerId;
    private String customerLastName;

    private String customerFirstName;

    private String customerPhone;
    private String  customerEmail;

    private boolean enableStatus;

    private String password;

    @Override
    public String toString() {
        return "CustomerModel{" +
                "customerId=" + customerId +
                ", customerLastName='" + customerLastName + '\'' +
                ", customerFirstName='" + customerFirstName + '\'' +
                ", customerPhone='" + customerPhone + '\'' +
                ", customerEmail='" + customerEmail + '\'' +
                ", enableStatus=" + enableStatus +
                ", password='" + password + '\'' +
                '}';
    }
}
