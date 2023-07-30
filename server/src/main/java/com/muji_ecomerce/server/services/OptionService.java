package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.model.OptionModel;

import java.util.List;

public interface OptionService {
    Option createNew(OptionModel optionModel);

    List<Option> fetchAll();

    Option EditOptionById(OptionModel optionModel);

    boolean deleteOptionById(Long id);
}
