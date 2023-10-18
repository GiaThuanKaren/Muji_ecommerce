package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Role;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

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
}
