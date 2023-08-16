package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Customer;
import com.muji_ecomerce.server.entity.VerificationTokenCustomer;
import com.muji_ecomerce.server.model.CustomerModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.CustomerRepository;
import com.muji_ecomerce.server.repository.VerifyTokenRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerServiceImplement implements CustomerService{

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private VerifyTokenRepository verifyTokenRepository;
    @Autowired
    private EmailService emailService;

    @Override
    public ResponeModelJson registerNewCCustomer(CustomerModel customerModel) throws MessagingException {
        Customer customer = new Customer();
        customer.setCustomerEmail(customerModel.getCustomerEmail());
        customer.setCustomerFirstName(customerModel.getCustomerFirstName());
        customer.setCustomerLastName(customerModel.getCustomerLastName());
        customer.setCustomerPhone(customerModel.getCustomerPhone());

        customer.setEnableStatus(false);
        Customer customerCreated= customerRepository.save(customer);

        String token  = UUID.randomUUID().toString();
        saveVerifycationToken(token,customerCreated);
        emailService.sendMail(customer.getCustomerEmail(), "Account Verification ",token);
        return new ResponeModelJson(HttpStatus.OK,"OKe");
    }

    @Override
    public ResponeModelJson FetchAllCustomer() {
        return new ResponeModelJson(HttpStatus.OK,"OKE",customerRepository.findAll());
    }


    @Override
    public void saveVerifycationToken(String token, Customer customer) {
        VerificationTokenCustomer verificationTokenCustomer = new VerificationTokenCustomer(customer,token);
        verifyTokenRepository.save(verificationTokenCustomer);
    }

    @Override
    public ResponeModelJson validateToken(String token) {
        VerificationTokenCustomer verificationTokenCustomerFound = verifyTokenRepository.findByToken(token);
        if(verificationTokenCustomerFound == null)
            return new ResponeModelJson<>(HttpStatus.CONFLICT,"Invalid Token");
        Customer customerFromToken = verificationTokenCustomerFound.getCustomer();
        Calendar calendar = Calendar.getInstance();
        if(verificationTokenCustomerFound.getExpirationDate().getTime() - calendar.getTime().getTime() <=0){
            verifyTokenRepository.delete(verificationTokenCustomerFound);
            return new ResponeModelJson<>(HttpStatus.CONFLICT,"Token Expired");
        }
        customerFromToken.setEnableStatus(true);
        customerRepository.save(customerFromToken);

        return new ResponeModelJson(HttpStatus.OK,"Done");
    }


    @Override
    public ResponeModelJson resendEmailVerifyCation(String token) throws MessagingException {
        VerificationTokenCustomer verificationTokenCustomerFound = verifyTokenRepository.findByToken(token);
        if(verificationTokenCustomerFound == null)
            return new ResponeModelJson<>(HttpStatus.CONFLICT,"Invalid Token");
        String newToken  = UUID.randomUUID().toString();
        verificationTokenCustomerFound.setToken(newToken);
        verifyTokenRepository.save(verificationTokenCustomerFound);
        emailService.sendMail(verificationTokenCustomerFound.getCustomer().getCustomerEmail(),"Account Verification ",newToken);
        return new ResponeModelJson(HttpStatus.OK,"Generated new token sucessfully");
    }

    @Override
    public ResponeModelJson updateCustomerById(CustomerModel customerModel) {
        Optional<Customer> customerFound= customerRepository.findById(customerModel.getCustomerId());
        if(customerFound.isPresent()){
            customerFound.get().setCustomerLastName(customerModel.getCustomerLastName());
            customerFound.get().setCustomerFirstName(customerModel.getCustomerFirstName());
            customerFound.get().setCustomerPhone(customerModel.getCustomerPhone());
            customerFound.get().setCustomerEmail(customerModel.getCustomerEmail());
            customerFound.get().setEnableStatus(customerModel.isEnableStatus());
            return new ResponeModelJson(HttpStatus.OK,"Updated Successfully",customerRepository.save(customerFound.get()));
        }

        return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Customer Id");

    }


    @Override
    public ResponeModelJson deleteCustomerById(Long id) {
        Optional<Customer> customerFound = customerRepository.findById(id);
        if(customerFound.isPresent()){
            customerRepository.deleteById(id);
            return new ResponeModelJson(HttpStatus.OK,"Deleted");
        }
        return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid ID");

    }
}
