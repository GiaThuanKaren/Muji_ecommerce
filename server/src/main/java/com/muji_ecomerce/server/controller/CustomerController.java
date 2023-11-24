package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.entity.Customer;
import com.muji_ecomerce.server.model.CustomerModel;
import com.muji_ecomerce.server.model.ResetPasswordCustomer;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.CustomerRepository;
import com.muji_ecomerce.server.services.CustomerService;
import com.muji_ecomerce.server.services.EmailService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmailService emailService;

    @GetMapping("/fetch_all")
    public ResponeModelJson fetchAllCustomer(
            @RequestParam(required = false) Integer _page,
            @RequestParam(required = false) Integer _limit) {
        
        if (_page != null && _limit != null) {
            return customerService.FetchPaginationCustomer(_page, _limit);
        } else {
            return customerService.FetchAllCustomer();
        }
    }


    @PostMapping("/login")
    public ResponeModelJson loginCustomer(@RequestBody CustomerModel customerModel){
        return customerService.loginCustomer(customerModel);
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


    @PutMapping("/update_customerbyid_withoutstatus")
    public ResponeModelJson updateCustomerWithouStatus(@RequestBody CustomerModel customerModel){
        System.out.println(customerModel.toString());
        return customerService.updateCustomerByIdWithoutStatus(customerModel);
    }

    @DeleteMapping("/delete_customer_byid")
    public ResponeModelJson deleteCustomerById(@RequestParam("id") Long id){
        return customerService.deleteCustomerById(id);
    }

    @PostMapping("/sendEmailResetPassword")
    public ResponeModelJson sendMailResetPassword(@RequestBody CustomerModel  customerModel) throws MessagingException {

        return customerService.emailResetPassword(customerModel.getCustomerEmail());
    }

    @PostMapping("/resetpasword")
    public ResponeModelJson resetPasword(@RequestBody ResetPasswordCustomer resetPasswordCustomerModel){

        return customerService.resetPasswordCustomer(resetPasswordCustomerModel.getNewPassword(),resetPasswordCustomerModel.getToken());
    }


    @PostMapping("/verifytokenResetPassword")
    public ResponeModelJson verifyTokenResetPassword(@RequestBody ResetPasswordCustomer resetPasswordCustomer){
        return customerService.verifyTokenCutomerWithoutDelete(resetPasswordCustomer.getToken());
    }
//    @GetMapping("/r")

//    @PostMapping("/register")
//    public ResponeModelJson createNewCutomer(CustomerModel customerModel){
//        return customerService.registerNewCCustomer(customerModel);
//    }
}
