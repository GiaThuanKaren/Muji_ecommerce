package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.entity.Product;
import com.muji_ecomerce.server.model.OptionValueModel;
import com.muji_ecomerce.server.model.ProductModal;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;
    @PostMapping("/create_new")
    private ResponeModelJson createNew(@RequestBody ProductModal productModal){
        ResponeModelJson ResponeModelJsonproduct = productService.createNew(productModal);
        return ResponeModelJsonproduct;
    }

    @PutMapping("/updateVariant")
    private ResponeModelJson updateVariantProduct(@RequestBody OptionValueModel optionValueModel){
        return productService.updateVariantProduct(optionValueModel);
    }
}
