package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long roleId;


    private String roleName;

    @OneToMany(mappedBy = "roleid",cascade=CascadeType.ALL)
    @JsonIgnore
    private List<Employee> employeeList;

//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "permission",
//            joinColumns = @JoinColumn(name = "role_id"),
//            inverseJoinColumns = @JoinColumn(name = "function_id")
//    )
//    @JsonIgnore
//    Set<Function> functions;
    @OneToMany(mappedBy = "role", cascade=CascadeType.ALL)
    Set<Permission> permissions;

}
