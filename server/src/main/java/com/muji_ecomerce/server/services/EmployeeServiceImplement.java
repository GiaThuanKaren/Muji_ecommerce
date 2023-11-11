package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Employee;
import com.muji_ecomerce.server.entity.Role;
import com.muji_ecomerce.server.model.EmployeeModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.EmployeeRepository;
import com.muji_ecomerce.server.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImplement implements EmployeeService{

   @Autowired
   private EmployeeRepository employeeRepository;

   @Autowired
   private RoleRepository roleRepository;
    @Override
    public Employee createNewEmployee(EmployeeModel employeeModel) {

        Optional<Role> role = roleRepository.findById(employeeModel.getRoleid());
        if(role.isPresent()){
            Employee employee = new Employee();
            employee.setEmployeeFirstName(employeeModel.getEmployeeFirstName());
            employee.setEmployeeLastName(employeeModel.getEmployeeLastName());
            employee.setEmployeeEmail(employeeModel.getEmployeeEmail());
            employee.setEmployeePhone(employeeModel.getEmployeePhone());
            employee.setEmployeePassword(employeeModel.getEmployeePassword());
            employee.setEmployeeAdress(employeeModel.getEmployeeAdress());
            employee.setRoleid(role.get());
            employeeRepository.save(employee);
//        Employee employee =service.createNewEmployee(employeeModel);
            return employee;
        }
        return null;



    }

    @Override
    public ResponeModelJson loginEmployee(EmployeeModel employeeModel) {

        System.out.println("------> " + employeeModel.getEmployeeEmail() + "-" + employeeModel.getEmployeePassword());
        Employee employee = employeeRepository.findByEmployeeEmail(employeeModel.getEmployeeEmail());

        if (employee != null) {
            System.out.println("-------------------> " + employee.getEmployeePassword());
        }

        if (employee == null) {
            return new ResponeModelJson(HttpStatus.NOT_FOUND, "Can not find user accout");
        }

        String password = employee.getEmployeePassword();

        if (password.trim().equals(employeeModel.getEmployeePassword().trim()) == false) {
            return new ResponeModelJson(HttpStatus.CONFLICT,"Wrong Password");
        }
        return new ResponeModelJson(HttpStatus.ACCEPTED,"Authenticated", employee);
    }

    @Override
    public List<Employee> getAllEmployee() {
        List<Employee> employeeList = employeeRepository.findAll();
        return employeeList;
    }

    @Override
    public Employee editOneEmployee(EmployeeModel employeeModel, Long employeeID) {
        Optional<Employee> employee = employeeRepository.findById(employeeID);
        if(employee.isPresent()){
            Employee employee1 =employee.get();

            employee1.setEmployeeAdress(employeeModel.getEmployeeAdress());
            employee1.setEmployeeFirstName(employeeModel.getEmployeeFirstName());
            employee1.setEmployeeLastName(employeeModel.getEmployeeLastName());
            employee1.setEmployeePhone(employeeModel.getEmployeePhone());

            return employeeRepository.save(employee1);
        }else {
            return null;
        }


    }
}
