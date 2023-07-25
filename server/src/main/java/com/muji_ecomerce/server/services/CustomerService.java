package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Customer;
import com.muji_ecomerce.server.model.CustomerModel;

public interface CustomerService {
    Customer registerNewCCustomer(CustomerModel customerModel);
};
