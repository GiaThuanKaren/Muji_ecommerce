package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.model.SkuValueModel;

public interface SkuValuesService {
    ResponeModelJson fetchAll();

    ResponeModelJson createNew(SkuValueModel skuValueModel);
}
