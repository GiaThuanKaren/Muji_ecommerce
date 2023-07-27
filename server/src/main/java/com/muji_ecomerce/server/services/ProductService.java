package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Product;
import com.muji_ecomerce.server.model.ProductModal;

public interface ProductService {
    Product createNew(ProductModal productModal);

}
