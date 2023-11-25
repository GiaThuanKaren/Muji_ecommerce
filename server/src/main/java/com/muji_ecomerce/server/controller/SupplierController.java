package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.model.SupplierModel;
import com.muji_ecomerce.server.services.SupplierService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/supplier")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;


    @GetMapping("/fetchAll")
    public ResponeModelJson fetchAllSupplier(){
        return supplierService.getAll();
    }

    @PostMapping("/createNewSupplier")
    public ResponeModelJson createNewSupplier(@RequestBody  SupplierModel supplierModel){
        return supplierService.createNewSupplier(supplierModel);
    }

    @PutMapping("/updateSupplierById")
    public ResponeModelJson updateSupplierById(@RequestBody SupplierModel supplierModel){
        return supplierService.updateSupplier(supplierModel);
    }

    @DeleteMapping("/deleteSupplierById")
    public ResponeModelJson delete(@RequestParam("id") Long id){
        System.out.println("ID ->>>>>>>> " + id);
        return supplierService.deleteSupplierById(id);
    }

}
