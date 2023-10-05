package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.entity.Customer;
import com.muji_ecomerce.server.model.CustomerModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.CustomerService;
import com.muji_ecomerce.server.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
public class RegistrationController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponeModelJson registerNewCustomer(@RequestBody CustomerModel customerModel) throws MessagingException {
        System.out.println(customerModel.toString());
        ResponeModelJson customer = customerService.registerNewCCustomer(customerModel);


        return customer;
    }

    private String applicationUrl(HttpServletRequest request) {
        return "http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
    }

}
