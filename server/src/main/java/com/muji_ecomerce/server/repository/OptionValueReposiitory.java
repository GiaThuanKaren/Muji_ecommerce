package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Option_value;
import com.muji_ecomerce.server.utils.OptionValueKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionValueReposiitory extends JpaRepository<Option_value, OptionValueKey> {
}
