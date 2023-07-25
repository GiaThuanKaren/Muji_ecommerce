package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.model.CustomerModel;
import com.muji_ecomerce.server.services.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class RegistrationController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("/register")
    public String registerNewCustomer(){
//        System.out.println("lksjdflds");
        return "done";
    }

}
