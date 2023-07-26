package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.entity.Customer;
import com.muji_ecomerce.server.model.CustomerModel;
import com.muji_ecomerce.server.services.CustomerService;
import com.muji_ecomerce.server.services.EmailService;
import jakarta.mail.MessagingException;
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

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public String registerNewCustomer(@RequestBody CustomerModel customerModel) throws MessagingException {
        Customer customer = customerService.registerNewCCustomer(customerModel);
        emailService.sendMail("sguworkspace1@gmail.com","Hi Test Mail","Body Test");
        System.out.println("lksjdflds");
        return "done";
    }

}
