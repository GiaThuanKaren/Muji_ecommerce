package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.model.ResponeModelJson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionRepository extends JpaRepository<Option,Long> {

}
