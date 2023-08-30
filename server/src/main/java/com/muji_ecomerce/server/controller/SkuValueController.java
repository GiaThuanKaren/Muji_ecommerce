package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.model.SkuValueModel;
import com.muji_ecomerce.server.services.SkuValuesService;
import com.muji_ecomerce.server.utils.Sku_Values_Key;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/skuvalue")
public class SkuValueController {

    @Autowired
    private SkuValuesService skuValuesService;

    @GetMapping("/fetchAll")
    public ResponeModelJson fetchALlSkuValues(){
        return skuValuesService.fetchAll();
    }


    @PostMapping("/create_new")
    public ResponeModelJson createNewSkuValue(@RequestBody SkuValueModel skuValueModel){
        System.out.println(skuValueModel.toString());
        return skuValuesService.createNew(skuValueModel);
    }

    @DeleteMapping("/deleteSkuValue")
    public ResponeModelJson deleteSkuValueById(
            @RequestParam("productid") Long productid,
            @RequestParam("skuid") Long skuid,
            @RequestParam("optionid") Long optionId,
            @RequestParam("valuesid") Long valuesId
    ){

        return skuValuesService.deleteSkuValeById(new Sku_Values_Key(
                productid,
                skuid,
                optionId,
                valuesId

        ));

    }

}
