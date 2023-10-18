package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Employee;
import com.muji_ecomerce.server.model.EmployeeModel;
import com.muji_ecomerce.server.model.ResponeModelJson;

import java.util.List;

public interface EmployeeService {
    Employee createNewEmployee(EmployeeModel employeeModel);

    List<Employee> getAllEmployee();

    Employee editOneEmployee(EmployeeModel employeeModel,Long employeeID);

    ResponeModelJson loginEmployee(EmployeeModel employeeModel);

}
