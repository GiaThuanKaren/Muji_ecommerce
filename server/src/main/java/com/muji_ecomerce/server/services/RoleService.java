package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.entity.Role;
import com.muji_ecomerce.server.model.OptionModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.model.RoleModel;

public interface RoleService {
    void createNewRole(String NameRole);

    ResponeModelJson FetchAllRole();

    Role EditRoleById(RoleModel roleModel);

    boolean deleteRoleById(Long id);
}
