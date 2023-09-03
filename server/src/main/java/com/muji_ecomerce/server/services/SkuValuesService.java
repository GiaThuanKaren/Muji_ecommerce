package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.model.MultiSkuValueModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.model.SkuValueModel;
import com.muji_ecomerce.server.utils.Sku_Values_Key;

public interface SkuValuesService {
    ResponeModelJson fetchAll();

    ResponeModelJson createNew(SkuValueModel skuValueModel);

    ResponeModelJson deleteSkuValeById(Sku_Values_Key skuValuesKeyID);

    ResponeModelJson createMultiSkuVale(MultiSkuValueModel multiSkuValueModel);
}
