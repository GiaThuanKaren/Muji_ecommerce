package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Customer;
import com.muji_ecomerce.server.model.CustomerModel;
import com.muji_ecomerce.server.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImplement implements CustomerService{

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Customer registerNewCCustomer(CustomerModel customerModel) {
        Customer customer = new Customer();
        customer.setCustomerEmail(customerModel.getCustomerEmail());
        customer.setCustomerFirstName(customerModel.getCustomerFirstName());
        customer.setCustomerLastName(customerModel.getCustomerLastName());
        customer.setCustomerPhone(customerModel.getCustomerPhone());
        customerRepository.save(customer);
        return customer;
    }
}
