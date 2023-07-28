package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.model.OptionModel;

public interface OptionService {
    Option createNew(OptionModel optionModel);
}
