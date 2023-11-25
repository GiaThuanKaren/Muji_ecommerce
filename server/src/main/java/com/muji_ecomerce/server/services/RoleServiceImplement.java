package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.entity.Role;
import com.muji_ecomerce.server.model.OptionModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.model.RoleModel;
import com.muji_ecomerce.server.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImplement implements  RoleService{

    @Autowired
    private RoleRepository roleRepository;
    @Override
    public void createNewRole(String NameRole) {
        Role role = new Role();
        role.setRoleName(NameRole);
        roleRepository.save(role);
    }

    @Override
    public ResponeModelJson FetchAllRole() {
        return new ResponeModelJson(HttpStatus.OK, "OKE", roleRepository.findAll());
    }

    @Override
    public boolean deleteRoleById(Long id) {
        Optional<Role> roleFound= roleRepository.findById(id);
        if(roleFound.isPresent()){
            roleRepository.deleteById(id);
            return true;
        }
        return  false;
    }

    @Override
    public Role EditRoleById(RoleModel roleModel) {
        Role roleEdit = new Role();
        System.out.println("Role ID ->>>>>" + roleModel.getRoleId());
        roleEdit.setRoleId(roleModel.getRoleId());
        roleEdit.setRoleName(roleModel.getRoleName());
        return roleRepository.save(roleEdit);
    }
}
