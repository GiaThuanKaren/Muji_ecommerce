package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.*;
import com.muji_ecomerce.server.model.OptionValueModel;
import com.muji_ecomerce.server.model.ProductModal;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.*;
import com.muji_ecomerce.server.utils.Option_Value_Key;
import com.muji_ecomerce.server.utils.Product_Option_Key;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImplement implements  ProductService{
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductOptionRepository productOptionRepository;

    @Autowired
    private OptionRepository optionRepository;
    @Autowired
    private CatogoriesRepository catogoriesRepository;

    @Autowired
    private OptionValueRepsitory optionValueRepsitory;
    @Override
    public ResponeModelJson createNew(ProductModal productModal) {
        Product product = new Product();
        Product_Option productOption = new Product_Option();

        product.setNameProduct(productModal.getNameProduct());
        product.setProductDescription(productModal.getProductDescription());
        product.setQuantityStock(productModal.getQuantityStock());
        Optional<Categories> categoriesFound = catogoriesRepository.findById(productModal.getCategories_id());
        if(categoriesFound.isPresent()){
            product.setCategories(categoriesFound.get());
            List<Product_Option> productOptionList = new ArrayList<>();
            Product productCreated =productRepository.save(product);
            for (Long id : productModal.getList_option()){
                Optional<Option> optionFound = optionRepository.findById(id);
                if(!optionFound.isPresent())
                    return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid OptionID ");

                Product_Option_Key productOptionKey = new Product_Option_Key(productCreated.getProductId(),id);
                Product_Option  productOption1 = new Product_Option();
                productOption1.setId(productOptionKey);
                productOption1.setProduct(productCreated);
                productOption1.setOption(optionFound.get());
                productOptionList.add(productOption1);

            }
            List<Product_Option> optionValueReturn =  productOptionRepository.saveAll(productOptionList);
            return new ResponeModelJson(HttpStatus.CREATED,"Done");
        }
        return new ResponeModelJson(HttpStatus.CONFLICT,"Error");
    }

    @Override
    public ResponeModelJson updateVariantProduct(OptionValueModel optionValueModel) {

        Optional<Option>  optionFound = optionRepository.findById(optionValueModel.getOption_id());
        Optional<Product> productFound= productRepository.findById(optionValueModel.getProduct_id());
        if(!optionFound.isPresent() ){
            return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Option Id");
        }
        if(!productFound.isPresent()){
            return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Product Id");
        }
        Option_value optionValue = new Option_value();
        optionValue.setId(new Option_Value_Key(optionValueModel.getProduct_id(),optionValueModel.getOption_id(),optionValueModel.getValue_id() ));
        optionValue.setValuesName(optionValueModel.getValue_name());

        return new ResponeModelJson(HttpStatus.CREATED,"Done",optionValueRepsitory.save(optionValue));

    }


    @Override
    public ResponeModelJson FetchAllProduct() {
        List<Product> productList = productRepository.findAll();
        return new ResponeModelJson(HttpStatus.OK,"Done",productList);
    }

    @Override
    public ResponeModelJson updateProductById(ProductModal productModal) {
        Optional<Product> productFound = productRepository.findById(productModal.getProductId());
        if(productFound.isPresent()){
            productFound.get().setNameProduct(productModal.getNameProduct());
            productFound.get().setProductDescription(productModal.getProductDescription());
            productFound.get().setQuantityStock(productModal.getQuantityStock());
            Optional<Categories> categoriesFound = catogoriesRepository.findById(productModal.getCategories_id());
            if(categoriesFound.isPresent()){
                productFound.get().setCategories(categoriesFound.get());
            }
            else
                return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Categories Id");
            List<Product_Option> productOptionList = new ArrayList<>();
            for (Long id : productModal.getList_option()){
                Optional<Option> optionFound = optionRepository.findById(id);
                if(!optionFound.isPresent())
                    return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid OptionID ");

                Product_Option_Key productOptionKey = new Product_Option_Key(productFound.get().getProductId(),id);
                Product_Option  productOption1 = new Product_Option();
                productOption1.setId(productOptionKey);
                productOption1.setProduct(productFound.get());
                productOption1.setOption(optionFound.get());
                productOptionList.add(productOption1);

            }

            productOptionRepository.saveAll(productOptionList);
            return new ResponeModelJson(
                    HttpStatus.CREATED,"Done"   , productRepository.save(productFound.get())
            );
        }
        return null;
    }

    @Override
    public ResponeModelJson deleteProductById(Long productId) {
        Optional<Product> productFound = productRepository.findById(productId);
        if(productFound.isPresent()){
            productRepository.deleteById(productId);
            return new ResponeModelJson(HttpStatus.OK,"Done");
        }
        else
            return new ResponeModelJson(HttpStatus.CONFLICT,"Can not Delte This Product");

    }
}
