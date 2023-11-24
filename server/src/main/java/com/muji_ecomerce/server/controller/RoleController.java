package com.muji_ecomerce.server.controller;


import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.entity.Role;
import com.muji_ecomerce.server.model.OptionModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.model.RoleModel;
import com.muji_ecomerce.server.services.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/create_new_role")
    public String createNewRole(@RequestBody RoleModel roleModel) {
        roleService.createNewRole(roleModel.getRoleName());
        return "ksdnfkjsd";
    }

    @GetMapping("/fetchAll")
    private ResponeModelJson getAll(){
        return roleService.FetchAllRole();
    }

    @DeleteMapping("/delete/{id}")
    public ResponeModelJson deleteByid(@PathVariable("id") Long roleID ){
        boolean isDelete = roleService.deleteRoleById(roleID);
        if(isDelete)
            return new ResponeModelJson<>(HttpStatus.OK,"Done");
        return new ResponeModelJson<>(HttpStatus.CONFLICT,"Error");

    }

    @PutMapping("/edit")
    public ResponeModelJson editById(@RequestBody RoleModel roleModel){
        Role roleEdited = roleService.EditRoleById(roleModel);
        if(roleEdited != null)
            return new ResponeModelJson(HttpStatus.OK,"Done",roleEdited);
        return new ResponeModelJson(HttpStatus.CONFLICT,"Error");
    }
}
