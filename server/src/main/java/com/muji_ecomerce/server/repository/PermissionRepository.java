package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Permission;
import com.muji_ecomerce.server.utils.PermissionKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, PermissionKey> {

    @Query(value = "select function.function_name, function.slug from permission, function where function.function_id = permission.function_id and permission.role_id = :roleId" ,nativeQuery = true)
    List<Map<String,Object>> findAllByPermissionRoleId(@Param("roleId") Long roleId);

}
