package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Product;
import com.muji_ecomerce.server.model.ProductModal;
import com.muji_ecomerce.server.model.ResponeModelJson;

public interface ProductService {
    ResponeModelJson createNew(ProductModal productModal);


}
