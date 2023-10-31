package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.*;
import com.muji_ecomerce.server.model.PermissionModel;
import com.muji_ecomerce.server.model.ProductModal;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.FunctionRepository;
import com.muji_ecomerce.server.repository.PermissionRepository;
import com.muji_ecomerce.server.repository.RoleRepository;
import com.muji_ecomerce.server.utils.OptionValueKey;
import com.muji_ecomerce.server.utils.PermissionKey;
import com.muji_ecomerce.server.utils.Product_Option_Key;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PermissionServiceImplement implements PermissionService {
    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private FunctionRepository functionRepository;

    @Override
    public ResponeModelJson createNew(PermissionModel permissionModel) {
        Permission permission = new Permission();

        Optional<Role> roleFound = roleRepository.findById(permissionModel.getRoleId());
        Optional<Function> functionFound = functionRepository.findById(permissionModel.getFunctionId());

        if(!roleFound.isPresent())
            return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Role Id");
        if(!functionFound.isPresent())
            return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Function Id");

        permission.setRole(roleFound.get());
        permission.setFunction(functionFound.get());
        permission.setPermission(new PermissionKey(permissionModel.getRoleId(), permissionModel.getFunctionId()));

        return new ResponeModelJson(HttpStatus.CREATED,"OKE", permissionRepository.save(permission));
    }


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

//    @Override
//    public ResponeModelJson updatePermissionById(PermissionModel permissionModel) {
//        Optional<Permission> permissionFound = permissionRepository.findByFunction_FunctionId(permissionModel.getFunctionId());
//        if(permissionFound.isPresent()) {
//            permissionFound.get().getPermission().setFunctionId(permissionModel.getFunctionId());
//
//            return new ResponeModelJson(
//                    HttpStatus.CREATED,"Done"   , permissionRepository.save(permissionFound.get())
//            );
//        }
//        return null;
//    }

    public ResponeModelJson deletePermissionById(PermissionKey permissionKey) {
        Optional<Permission> permissionFound = permissionRepository.findById(permissionKey);

        if (permissionFound.isPresent()){
            permissionRepository.deleteById(permissionKey);
            return new ResponeModelJson(HttpStatus.OK,"Done");
        }
        else
            return new ResponeModelJson(HttpStatus.CONFLICT,"Can not Delete This Permission");

    }
}
