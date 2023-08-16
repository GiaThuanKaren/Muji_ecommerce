package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.model.CustomerModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("/fetch_all")
    public ResponeModelJson fetchAllCustomer(){
        return customerService.FetchAllCustomer();
    }

    @GetMapping("/verify_token")
    public ResponeModelJson verifyTokenCustomer(@RequestParam("token") String token){
        if(token!= null)
            return customerService.validateToken(token);
        return new ResponeModelJson(HttpStatus.CONFLICT,"Required Token");
    }

    @PutMapping("/update_customerbyid")
    public ResponeModelJson updateCustomerById(@RequestBody CustomerModel customerModel){
        System.out.println(customerModel.toString());
        return customerService.updateCustomerById(customerModel);
    }

    @DeleteMapping("/delete_customer_byid")
    public ResponeModelJson deleteCustomerById(@RequestParam("id") Long id){
        return customerService.deleteCustomerById(id);
    }


//    @GetMapping("/r")

//    @PostMapping("/register")
//    public ResponeModelJson createNewCutomer(CustomerModel customerModel){
//        return customerService.registerNewCCustomer(customerModel);
//    }
}
