package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.model.ResponeModelJson;

public interface FunctionService {
    void createNewFunction(String nameFunction);

    ResponeModelJson FetchAllFunc();
}
