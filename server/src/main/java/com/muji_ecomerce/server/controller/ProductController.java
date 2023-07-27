package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.entity.Product;
import com.muji_ecomerce.server.model.ProductModal;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;
    @PostMapping("/create_new")
    private ResponeModelJson createNew(@RequestBody ProductModal productModal){
        Product product = productService.createNew(productModal);
        if(product!=null)
            return new ResponeModelJson(HttpStatus.CREATED,"Done",product);
        else
            return new ResponeModelJson(HttpStatus.CREATED,"Error");
    }
}
