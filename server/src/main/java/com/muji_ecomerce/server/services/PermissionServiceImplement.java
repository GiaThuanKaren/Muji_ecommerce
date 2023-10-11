package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Permission;
import com.muji_ecomerce.server.model.PermissionModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PermissionServiceImplement implements PermissionService {
    @Autowired
    private PermissionRepository permissionRepository;

    @Override
    public ResponeModelJson FetchAllPermission() {
        return new ResponeModelJson(HttpStatus.OK, "OKE", permissionRepository.findAll());
    }

    @Override
    public ResponeModelJson FindPermissionByRole(Long roleId) {
        List<Map<String,Object>> permission = permissionRepository.findAllByPermissionRoleId(roleId);

        System.out.println("permission --> " + permission);

        if (permission == null) {
            return new ResponeModelJson(HttpStatus.NOT_FOUND, "Can not find permission");
        }

        return new ResponeModelJson(HttpStatus.ACCEPTED,"Find", permission);
    }
}
