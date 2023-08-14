package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Customer;
import com.muji_ecomerce.server.entity.VerificationTokenCustomer;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.model.VerifyTokenModel;
import com.muji_ecomerce.server.repository.CustomerRepository;
import com.muji_ecomerce.server.repository.VerifyTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.Optional;

public class VerifyTokenServiceImplement implements VerifyTokenService{

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private VerifyTokenRepository verifyTokenRepository;
    @Override
    public ResponeModelJson AddNewVerifyToken(VerifyTokenModel verifyTokenModel) {
        VerificationTokenCustomer verificationTokenCustomer = new VerificationTokenCustomer();
        verificationTokenCustomer.setToken(verifyTokenModel.getToken());
        Optional<Customer> customerFound =customerRepository.findById(verifyTokenModel.getUserid()) ;
        if(customerFound.isPresent()){
            verificationTokenCustomer.setVerificationTokenCustomerID(verifyTokenModel.getUserid());
            verificationTokenCustomer.setCustomer(customerFound.get());
            return new ResponeModelJson<>(HttpStatus.OK,"OKE",verifyTokenRepository.save(verificationTokenCustomer));
        }else{
            return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid user id");
        }



    }
}
