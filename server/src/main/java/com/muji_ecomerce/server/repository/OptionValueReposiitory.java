package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Option_value;
import com.muji_ecomerce.server.utils.Option_Value_Key;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionValueReposiitory extends JpaRepository<Option_value,Option_Value_Key> {
}
