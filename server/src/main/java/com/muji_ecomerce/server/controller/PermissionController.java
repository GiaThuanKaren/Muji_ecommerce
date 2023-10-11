package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.model.EmployeeModel;
import com.muji_ecomerce.server.model.PermissionModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/permission")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @GetMapping("/fetchAll")
    private ResponeModelJson getAll(){
        return permissionService.FetchAllPermission();
    }

    @PostMapping("/findPermissionByRole")
    public ResponeModelJson findPermissionByRole(@RequestBody Map<String, Long> requestBody) {
        Long roleId = requestBody.get("roleId");
        return permissionService.FindPermissionByRole(roleId);
    }
}
