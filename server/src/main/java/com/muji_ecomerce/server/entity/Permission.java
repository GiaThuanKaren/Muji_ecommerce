package com.muji_ecomerce.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.muji_ecomerce.server.utils.PermissionKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Permission {
    @EmbeddedId
    PermissionKey permission;

    @ManyToOne
    @JsonIgnore
    @MapsId("roleId")
    @JoinColumn(name = "role_id")
    Role role;

    @ManyToOne
    @JsonIgnore
    @MapsId("functionId")
    @JoinColumn(name = "function_id")
    Function function;

    @Override
    public String toString() {
        return "Permission{" +
                "role=" + role +
                ", function=" + function +
                '}';
    }
}
