package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Product;
import com.muji_ecomerce.server.entity.Product_Sku;
import com.muji_ecomerce.server.model.ProductSkuModel;
import com.muji_ecomerce.server.repository.ProductRepository;
import com.muji_ecomerce.server.repository.ProductSkuRepository;
import com.muji_ecomerce.server.utils.Product_Sku_Key;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductSkuServiceImplement implements ProductSkuService{

    @Autowired
    private ProductSkuRepository productSkuRepository;

    @Autowired
    private ProductRepository productRepository;
    @Override
    public Product_Sku createNew(ProductSkuModel productSkuModel) {
        Optional<Product> productFound = productRepository.findById(productSkuModel.getProduct_id());
        if(productFound.isPresent()){
            System.out.println(productFound.get().getProductId() + " " + productSkuModel.getSku_id());
//            System.out.println(new Product_Sku_Key(productSkuModel.getProduct_id(), productSkuModel.getSku_id()));
            Product_Sku productSku = new Product_Sku();
            productSku.setId( new Product_Sku_Key(productFound.get().getProductId(), productSkuModel.getSku_id()) );
            productSku.setPrice(productSkuModel.getPrice());
            productSku.setSkuName(productSkuModel.getSku_name());
            productSku.setProduct(productFound.get());

            return productSkuRepository.save(productSku);
        }
        return null;
    }
}
