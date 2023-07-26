package com.muji_ecomerce.server.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @PostMapping("/create_new")
    public String createNewEmployee(){

        return "";
    }

}
