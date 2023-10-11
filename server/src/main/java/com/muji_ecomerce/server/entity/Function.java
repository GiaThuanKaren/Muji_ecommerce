package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Setter
@Getter
public class Function {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long functionId;

    private String functionName;

    private String slug;

    @OneToMany(mappedBy = "function", cascade=CascadeType.ALL)
    Set<Permission> permissions;

//    @ManyToMany(mappedBy = "functions", fetch = FetchType.LAZY)
//    @JsonIgnore
//    private Set<Role> roles;
}
