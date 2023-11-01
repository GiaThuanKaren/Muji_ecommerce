package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.model.PermissionModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.utils.PermissionKey;
import org.springframework.stereotype.Service;

public interface PermissionService {
    ResponeModelJson FetchAllPermission();

    ResponeModelJson FindPermissionByRole(Long roleId);

//    ResponeModelJson updatePermissionById(PermissionModel permissionModel);

    ResponeModelJson deletePermissionById(PermissionKey permissionKey);

    ResponeModelJson createNew(PermissionModel permissionModel);
}
