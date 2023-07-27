package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.entity.ProductLine;
import com.muji_ecomerce.server.model.ProductLineModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.ProductLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/productline")
public class ProductLineController {


    @Autowired
    private ProductLineService productLineService;
    @PostMapping("/create_new")
    public ResponeModelJson createNew(@RequestBody ProductLineModel productLineModel){
        ProductLine productLinecreated = productLineService.createNew(productLineModel);
        if(productLinecreated != null)
            return new ResponeModelJson(HttpStatus.CREATED,"Done");
        else
            return new ResponeModelJson(HttpStatus.CONFLICT,"Failed to create new productline",productLinecreated);

    }
}
