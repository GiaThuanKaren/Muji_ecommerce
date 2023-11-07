//package com.muji_ecomerce.server.controller;
//
////import com.muji_ecomerce.server.config.JWTGenerator;
//import com.muji_ecomerce.server.model.AuthResponseModel;
//import com.muji_ecomerce.server.model.CustomerModel;
//import com.muji_ecomerce.server.repository.CustomerRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin
//public class AuthController {
//    private AuthenticationManager authenticationManager;
//    private CustomerRepository customerRepository;
//    private PasswordEncoder passwordEncoder;
//    private JWTGenerator jwtGenerator;
//
//    @Autowired
//    public AuthController(AuthenticationManager authenticationManager, CustomerRepository customerRepository, PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
//        this.authenticationManager = authenticationManager;
//        this.customerRepository = customerRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.jwtGenerator = jwtGenerator;
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<AuthResponseModel> loginCustomer(@RequestBody CustomerModel customerModel) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        customerModel.getCustomerEmail(),
//                        customerModel.getPassword()
//                )
//        );
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String token = jwtGenerator.generateToken(authentication);
//
//        return new ResponseEntity<>(new AuthResponseModel(token), HttpStatus.OK);
////        return customerService.loginCustomer(customerModel);
//    }
//
////    @PostMapping("/register")
////    public ResponeModelJson createNewCutomer(CustomerModel customerModel){
////        return customerService.registerNewCCustomer(customerModel);
////    }
//}
