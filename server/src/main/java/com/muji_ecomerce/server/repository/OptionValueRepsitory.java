package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Option_value;
import com.muji_ecomerce.server.utils.OptionValueKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OptionValueRepsitory extends JpaRepository<Option_value, OptionValueKey> {
    Optional<List<Option_value>> findAllByIdProductId(Long productId);
}
