package com.muji_ecomerce.server.config;

import com.muji_ecomerce.server.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

//@Configuration
//@RequiredArgsConstructor
public class ApplicationConfig {

    @Autowired
    private  CustomerRepository customerRepository;


//    @Bean
//    public UserDetailsService userDetailsService(){
//        return  username ->  customerRepository
//                .findByCustomerEmail(username)
//                .orElseThrow(()-> new UsernameNotFoundException("User Not Found"));
//    }

}
