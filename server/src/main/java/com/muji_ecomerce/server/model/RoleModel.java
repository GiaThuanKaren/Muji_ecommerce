package com.muji_ecomerce.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleModel {
    private Long roleId;
    private String roleName;
}
