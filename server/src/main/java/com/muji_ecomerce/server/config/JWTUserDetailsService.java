//package com.muji_ecomerce.server.config;
//
//import com.muji_ecomerce.server.entity.Customer;
//import com.muji_ecomerce.server.model.CustomerModel;
//import com.muji_ecomerce.server.repository.CustomerRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//
//@Service
//public class JWTUserDetailsService implements UserDetailsService {
//    private CustomerRepository customerRepository;
//
//    @Autowired
//    public JWTUserDetailsService(CustomerRepository customerRepository) {
//        this.customerRepository = customerRepository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        Customer user = customerRepository.findByCustomerEmail(email);
//
//        if (user == null) {
//            throw new UsernameNotFoundException("User not found with email: " + email);
//        }
//        return new org.springframework.security.core.userdetails.User(user.getCustomerEmail(), user.getPassword(),
//                new ArrayList<>());
//    }
//
////    public Customer save(CustomerModel user) {
////        Customer newUser = new Customer();
////        newUser.setCustomerEmail(user.getCustomerEmail());
////        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
////        return customerRepository.save(newUser);
////    }
//}
