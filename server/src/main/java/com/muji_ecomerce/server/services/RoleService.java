package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.model.ResponeModelJson;

public interface RoleService {
    void createNewRole(String NameRole);

    ResponeModelJson FetchAllRole();
}
