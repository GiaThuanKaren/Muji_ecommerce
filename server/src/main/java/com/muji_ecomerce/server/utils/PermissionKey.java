package com.muji_ecomerce.server.utils;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PermissionKey implements Serializable {
    @Column(name = "role_id")
    private Long roleId;

    @Column(name = "function_id")
    private  Long functionId;


}
