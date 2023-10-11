package com.muji_ecomerce.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermissionModel {
    private Long permissionId;
    private Long functionId;
    private Long roleId;
}
