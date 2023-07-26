package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Role;
import com.muji_ecomerce.server.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImplement implements  RoleService{

    @Autowired
    private RoleRepository roleRepository;
    @Override
    public void createNewRole(String NameRole) {
        Role role = new Role();
        role.setRole_name(NameRole);
        roleRepository.save(role);
    }



}
