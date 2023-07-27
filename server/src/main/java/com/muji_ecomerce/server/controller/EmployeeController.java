package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.entity.Employee;
import com.muji_ecomerce.server.model.EmployeeModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/get_all")
    public ResponeModelJson getAll1(){
        List<Employee> employeeList= employeeService.getAllEmployee();
        return new ResponeModelJson(HttpStatus.OK,
                "Oke",employeeList);
    }

    @PostMapping("/create_new")
    public String createNewEmployee(@RequestBody EmployeeModel employeeModel){
        Employee employee= employeeService.createNewEmployee(employeeModel);
        System.out.println(employeeModel);
        if(employee != null){

            return "Done";
        }

        return "No";
    }


}
