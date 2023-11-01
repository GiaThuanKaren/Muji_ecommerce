package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.model.EmployeeModel;
import com.muji_ecomerce.server.model.PermissionModel;
import com.muji_ecomerce.server.model.ProductModal;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.PermissionService;
import com.muji_ecomerce.server.utils.PermissionKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/permission")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @PostMapping("/create_new")
    private ResponeModelJson createNew(@RequestBody PermissionModel permissionModel) {

        return permissionService.createNew(permissionModel);
    }

    @GetMapping("/fetchAll")
    private ResponeModelJson getAll(){
        return permissionService.FetchAllPermission();
    }

    @PostMapping("/findPermissionByRole")
    public ResponeModelJson findPermissionByRole(@RequestBody Map<String, Long> requestBody) {
        Long roleId = requestBody.get("roleId");
        return permissionService.FindPermissionByRole(roleId);
    }

//    @PutMapping("/updatePermissionByID")
//    private ResponeModelJson updatePermissionById(@RequestBody PermissionModel permissionModel){
//        System.out.println(permissionModel.toString());
//        return permissionService.updatePermissionById(permissionModel);
//    }

    @DeleteMapping("/deletePermission")
    private ResponeModelJson deletePermisisonById(@RequestParam("roleId") Long roleId, @RequestParam("funcId") Long funcId){
        return permissionService.deletePermissionById(new PermissionKey(roleId, funcId));
    }

}
