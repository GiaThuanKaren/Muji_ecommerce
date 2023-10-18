package com.muji_ecomerce.server.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeModel {
    private String employeeFirstName;

    private String employeeLastName;

    private String employeePhone;

    private String employeeAdress;

    private String employeeEmail;

    private String employeePassword;

    private Long roleid;

}
