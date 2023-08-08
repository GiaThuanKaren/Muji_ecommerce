package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Product;
import com.muji_ecomerce.server.entity.Product_Sku;
import com.muji_ecomerce.server.model.ProductSkuModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.ProductRepository;
import com.muji_ecomerce.server.repository.ProductSkuRepository;
import com.muji_ecomerce.server.utils.Product_Sku_Key;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
            productSku.setImageProduct(productSkuModel.getImageProduct());
            productSku.setQuantityStock(productSkuModel.getQuantityStock());


            return productSkuRepository.save(productSku);
        }
        return null;
    }

    @Override
    public ResponeModelJson FetchAll() {
        return new ResponeModelJson(HttpStatus.OK,"Oke",productSkuRepository.findAll());
    }

    @Override
    public ResponeModelJson updateProductSkuByID(ProductSkuModel productSkuModel) {
        Optional<Product_Sku> productSkuFound = productSkuRepository.findById(new Product_Sku_Key(productSkuModel.getProduct_id(), productSkuModel.getSku_id()));

        if(productSkuFound.isPresent()){
            productSkuFound.get().setSkuName(productSkuModel.getSku_name());
            productSkuFound.get().setPrice(productSkuModel.getPrice());
            return new ResponeModelJson<>(HttpStatus.OK,"OKE",productSkuRepository.save(productSkuFound.get()));
        }
        return null;
    }

    @Override
    public ResponeModelJson deleteProductSkuByID(Product_Sku_Key productSkuKey) {
        if(productSkuRepository.findById(productSkuKey).isPresent()){
            productSkuRepository.deleteById(productSkuKey);
            return new ResponeModelJson(HttpStatus.OK,"Deleted Sucesfully");
        }

        return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid productsku id - Can not delete");
    }
}
