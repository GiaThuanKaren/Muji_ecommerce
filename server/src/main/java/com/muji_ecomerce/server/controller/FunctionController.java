package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.FunctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/function")
public class FunctionController {

    @Autowired
    private FunctionService functionService;

    @GetMapping("/fetchAll")
    private ResponeModelJson getAll(){
        return functionService.FetchAllFunc();
    }
}
