package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.entity.Product_Sku;
import com.muji_ecomerce.server.entity.Sku_values;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.model.SkuValueModel;
import com.muji_ecomerce.server.repository.OptionRepository;
import com.muji_ecomerce.server.repository.ProductSkuRepository;
import com.muji_ecomerce.server.repository.SkuValuesRepository;
import com.muji_ecomerce.server.utils.Product_Sku_Key;
import com.muji_ecomerce.server.utils.Sku_Values_Key;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SkuValuesServiceImplements implements SkuValuesService{

    @Autowired
    private SkuValuesRepository skuValuesRepository;

    @Autowired
    private OptionRepository optionRepository;


    @Autowired
    private ProductSkuRepository productSkuRepository;


    @Override
    public ResponeModelJson fetchAll() {
        return new ResponeModelJson(HttpStatus.OK,"Done",skuValuesRepository.findAll());
    }

    @Override
    public ResponeModelJson createNew(SkuValueModel skuValueModel) {
        Optional<Option> optionFound = optionRepository.findById(skuValueModel.getOptionId());
        Optional<Product_Sku> productSkuFound = productSkuRepository.findById(new Product_Sku_Key(skuValueModel.getProductId(),skuValueModel.getSkuId()));
        if(!optionFound.isPresent())
            return new ResponeModelJson<>(HttpStatus.CONFLICT,"Invalid Option Id");
        if(!productSkuFound.isPresent())
            return new ResponeModelJson<>(HttpStatus.CONFLICT,"Invalid Product Sku ID");

        Sku_values skuValuesCreated = new Sku_values();
        skuValuesCreated.setId(new Sku_Values_Key(skuValueModel.getProductId(),skuValueModel.getSkuId(),skuValueModel.getOptionId(),skuValueModel.getValuesId()));
        skuValuesCreated.setProductSku(productSkuFound.get());
        skuValuesCreated.setOption(optionFound.get());
        skuValuesRepository.save(skuValuesCreated);
        return new ResponeModelJson(HttpStatus.CREATED,"OKE");
    }
}