package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.entity.ProductLine;
import com.muji_ecomerce.server.model.ProductLineModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.ProductLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/productline")
public class ProductLineController {


    @Autowired
    private ProductLineService productLineService;

    @GetMapping("/fetch_all")
    public ResponeModelJson fetchAll(){
        return new ResponeModelJson(HttpStatus.OK,"OKe",productLineService.fetchAll());
    }

    @DeleteMapping("/delete/{id}")
    public ResponeModelJson delete(@PathVariable("id") Long id){
        return new ResponeModelJson(HttpStatus.OK,"Oke",productLineService.delete(id));
    }

    @PutMapping("/edit")
    public ResponeModelJson editById(@RequestBody ProductLineModel productLineModel){
        System.out.println(productLineModel.toString());
        ProductLine productLineEdited = productLineService.edit(productLineModel);
        if(productLineEdited!=null)
            return new ResponeModelJson(HttpStatus.OK,"Oe",productLineEdited);
        return new ResponeModelJson(HttpStatus.CONFLICT,"Failed");
    }

    @PostMapping("/create_new")
    public ResponeModelJson createNew(@RequestBody ProductLineModel productLineModel){
        ProductLine productLinecreated = productLineService.createNew(productLineModel);
        if(productLinecreated != null)
            return new ResponeModelJson(HttpStatus.CREATED,"Done");
        else
            return new ResponeModelJson(HttpStatus.CONFLICT,"Failed to create new productline",productLinecreated);

    }
}
