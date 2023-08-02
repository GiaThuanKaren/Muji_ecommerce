package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Product_Sku;
import com.muji_ecomerce.server.model.ProductSkuModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.utils.Product_Sku_Key;

public interface ProductSkuService {
    ResponeModelJson FetchAll();
    Product_Sku createNew(ProductSkuModel productSkuModel);

    ResponeModelJson updateProductSkuByID(ProductSkuModel productSkuModel);

    ResponeModelJson deleteProductSkuByID(Product_Sku_Key productSkuKey);
}
