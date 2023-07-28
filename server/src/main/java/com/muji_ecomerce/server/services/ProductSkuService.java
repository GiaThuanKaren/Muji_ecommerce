package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Product_Sku;
import com.muji_ecomerce.server.model.ProductSkuModel;

public interface ProductSkuService {
    Product_Sku createNew(ProductSkuModel productSkuModel);
}
