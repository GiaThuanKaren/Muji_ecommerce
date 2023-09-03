package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Product;
import com.muji_ecomerce.server.model.OptionValueModel;
import com.muji_ecomerce.server.model.ProductModal;
import com.muji_ecomerce.server.model.ResponeModelJson;

public interface ProductService {
    ResponeModelJson createNew(ProductModal productModal);

    ResponeModelJson updateVariantProduct(OptionValueModel optionValueModel);

    ResponeModelJson FetchAllProduct();

    ResponeModelJson updateProductById(ProductModal productModal);

    ResponeModelJson deleteProductById(Long productId);

    ResponeModelJson getProductByIdCategories(Long idCategories);


    ResponeModelJson getDetailProductByProductId(Long ProductId);
}
