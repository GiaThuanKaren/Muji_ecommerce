package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Customer;
import com.muji_ecomerce.server.entity.VerificationTokenCustomer;
import com.muji_ecomerce.server.model.CustomerModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.CustomerRepository;
import com.muji_ecomerce.server.repository.VerifyTokenRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

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
        customer.setPassword(customerModel.getPassword());
        customer.setEnableStatus(false);
        Customer customerCreated= customerRepository.save(customer);

        String token  = UUID.randomUUID().toString();
        saveVerifycationToken(token,customerCreated);
        emailService.sendMail(customer.getCustomerEmail(), "Account Verification ",token);
        return new ResponeModelJson(HttpStatus.OK,"OKe");
    }

    @Override
    public ResponeModelJson loginCustomer(CustomerModel customerModel) {
        List<Map<String,Object>> customer= customerRepository.findTokenByEmailCustomer(customerModel.getCustomerEmail());

        if(customer.size() ==0){
            return new ResponeModelJson(HttpStatus.NOT_FOUND,"Can not find user accout");
        }
        boolean enable_status = (boolean) customer.get(0).get("enable_status");
        String password =customer.get(0).get("password").toString();


        if(enable_status == false){
            return new ResponeModelJson(HttpStatus.CONFLICT,"Please Verify Your Email");
        }

        if(password.trim().equals(customerModel.getPassword().trim())==false ){
           return  new ResponeModelJson(HttpStatus.CONFLICT,"Wrong Password");
        }
        return new ResponeModelJson(HttpStatus.ACCEPTED,"Authenticated");
//        return new ResponeModelJson(HttpStatus.OK,"DOne",customer.get(0).get("enable_status"));


//        return new ResponeModelJson(HttpStatus.OK,"sdf", customerRepository.findTokenByEmailCustomer(customerModel.getCustomerEmail()));
    }



    @Override
    public ResponeModelJson FetchAllCustomer() {
        return new ResponeModelJson(HttpStatus.OK,"OKE",customerRepository.findAll());
    }

    @Override
    public ResponeModelJson FetchPaginationCustomer(int _page, int _limit) {
        Page<Customer> customerPage = customerRepository.findAll(PageRequest.of(_page - 1, _limit));
        List<Customer> customers = customerPage.getContent();
        return new ResponeModelJson(HttpStatus.OK, "OKE", customers);
    }

    @Override
    public ResponeModelJson getCustomerByFirstNameAndLastName(String fullName) {
        List<Customer> customerList = customerRepository.findByCustomerFirstNameContainingOrCustomerLastNameContaining(fullName, fullName);
        return new ResponeModelJson(HttpStatus.OK, "OKE", customerList);
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
            if(customerModel.getCustomerLastName() != null){
                customerFound.get().setCustomerLastName(customerModel.getCustomerLastName());
            }
            if(customerModel.getCustomerFirstName() != null){
                customerFound.get().setCustomerFirstName(customerModel.getCustomerFirstName());
            }
            if(customerModel.getCustomerPhone() != null){
                customerFound.get().setCustomerPhone(customerModel.getCustomerPhone());
            }
            if(customerModel.getCustomerEmail() != null){
                customerFound.get().setCustomerEmail(customerModel.getCustomerEmail());
            }

            if(customerModel.isEnableStatus()){
                customerFound.get().setEnableStatus(customerModel.isEnableStatus());
            }
            if(customerModel.getPassword() != null){
                customerFound.get().setPassword(customerModel.getPassword());
            }
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

    @Override
    public ResponeModelJson resetPasswordCustomer(String newPassword, String token) {
        if(token == null || token == ""){
            return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Tokem");
        }
        Customer customerFound= verifyTokenRepository.findByToken(token).getCustomer();
        if(customerFound==null){
            return new ResponeModelJson(HttpStatus.CONFLICT,"Can not find any customer ");
        }
        customerFound.setPassword(newPassword);
        customerRepository.save(customerFound);
        return new ResponeModelJson(HttpStatus.OK,"Changed Password Successfully");
    }

    @Override
    public ResponeModelJson emailResetPassword(String emailCustomer) throws MessagingException {
        Optional<Customer> customerFound = customerRepository.findOptionalByCustomerEmail(emailCustomer);
        if(customerFound.isPresent()){
            String uuidToken = UUID.randomUUID().toString();
            emailService.sendMailResetPassword(emailCustomer,"Reset Email",uuidToken);
            VerificationTokenCustomer verificationTokenCustomer = new VerificationTokenCustomer(customerFound.get(),uuidToken);
            verifyTokenRepository.save(verificationTokenCustomer);
            return new ResponeModelJson(HttpStatus.OK,"Done");
        }

        return new ResponeModelJson(HttpStatus.OK,"Can not find any account with this email");
    }



    @Override
    public ResponeModelJson verifyTokenCutomerWithoutDelete(String Token) {
        VerificationTokenCustomer verificationTokenCustomerFound = verifyTokenRepository.findByToken(Token);
        if(verificationTokenCustomerFound == null)
            return new ResponeModelJson<>(HttpStatus.CONFLICT,"Invalid Token");

        Calendar calendar = Calendar.getInstance();
        if(verificationTokenCustomerFound.getExpirationDate().getTime() - calendar.getTime().getTime() <=0){
//            verifyTokenRepository.delete(verificationTokenCustomerFound);
            return new ResponeModelJson<>(HttpStatus.CONFLICT,"Token Expired");
        }
        return new ResponeModelJson(HttpStatus.OK,"Done");
    }


    @Override
    public ResponeModelJson updateProfileUser(CustomerModel customerModel) {
        Optional<Customer> customerFound= customerRepository.findById(customerModel.getCustomerId());
        if(customerFound.isPresent()){
            if(customerModel.getCustomerLastName() != null){
                customerFound.get().setCustomerLastName(customerModel.getCustomerLastName());
            }
            if(customerModel.getCustomerFirstName() != null){
                customerFound.get().setCustomerFirstName(customerModel.getCustomerFirstName());
            }
            if(customerModel.getCustomerPhone() != null){
                customerFound.get().setCustomerPhone(customerModel.getCustomerPhone());
            }
            if(customerModel.getCustomerEmail() != null){
                customerFound.get().setCustomerEmail(customerModel.getCustomerEmail());
            }

            if(customerModel.isEnableStatus()){
                customerFound.get().setEnableStatus(customerModel.isEnableStatus());
            }
            if(customerModel.getPassword() != null){
                customerFound.get().setPassword(customerModel.getPassword());
            }
            return new ResponeModelJson(HttpStatus.OK,"Updated Successfully",customerRepository.save(customerFound.get()));
        }

        return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Customer Id");
    }
}
