package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Customer;
import com.muji_ecomerce.server.model.CustomerModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import jakarta.mail.MessagingException;

public interface CustomerService {
    ResponeModelJson registerNewCCustomer(CustomerModel customerModel) throws MessagingException;

    ResponeModelJson FetchAllCustomer();

    void saveVerifycationToken(String token, Customer customer);

    ResponeModelJson validateToken(String token);

    ResponeModelJson resendEmailVerifyCation(String token) throws MessagingException;

    ResponeModelJson updateCustomerById(CustomerModel customerModel);


    ResponeModelJson deleteCustomerById(Long id);
};
