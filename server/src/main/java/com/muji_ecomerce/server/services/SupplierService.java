package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.model.SupplierModel;
import org.springframework.stereotype.Service;


public interface SupplierService {
    ResponeModelJson getAll();


    ResponeModelJson createNewSupplier(SupplierModel supplierModel);


    ResponeModelJson updateSupplier(SupplierModel supplierModel);

    ResponeModelJson deleteSupplierById(Long id);
}
