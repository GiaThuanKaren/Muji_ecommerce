package com.muji_ecomerce.server.controller;


import com.muji_ecomerce.server.entity.Product_Sku;
import com.muji_ecomerce.server.model.ProductSkuModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.ProductSkuService;
import com.muji_ecomerce.server.utils.Product_Sku_Key;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/product_sku")
public class ProductSkuController {

    @Autowired
    private ProductSkuService productSkuService;

    @PostMapping("/create_new")
    public ResponeModelJson createNew(@RequestBody ProductSkuModel productSkuModel){
        System.out.println(productSkuModel.toString());
        Product_Sku productSkuCreated = productSkuService.createNew(productSkuModel);
        if(productSkuCreated != null)
            return new ResponeModelJson(HttpStatus.CREATED,"Done",productSkuCreated);
        return new ResponeModelJson(HttpStatus.CONFLICT,"Error");
    }

    @GetMapping("/fetch_all")
    public ResponeModelJson FetchAll(){
        return productSkuService.FetchAll();
    }

    @PutMapping("/update_productsku")
    public ResponeModelJson updateID(@RequestBody ProductSkuModel productSkuModel){
        return productSkuService.updateProductSkuByID(productSkuModel);
    }

    @DeleteMapping("/delete_product_sku")
    public ResponeModelJson deleteProductSkuById(@RequestParam("idproduct") Long productId,@RequestParam("idsku") Long skuid){
        System.out.println(productId+"  "+skuid);
        return productSkuService.deleteProductSkuByID(new Product_Sku_Key(productId,skuid));
    }
}
