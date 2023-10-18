package com.muji_ecomerce.server.controller;


import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.model.RoleModel;
import com.muji_ecomerce.server.services.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/create_new_role")
    public String createNewRole(@RequestBody RoleModel roleModel){
        System.out.println(roleModel.getNameRole());
        roleService.createNewRole(roleModel.getNameRole());
        return "ksdnfkjsd";
    }

    @GetMapping("/fetchAll")
    private ResponeModelJson getAll(){
        return roleService.FetchAllRole();
    }


}
