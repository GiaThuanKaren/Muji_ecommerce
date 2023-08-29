package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.model.OptionValueModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.utils.OptionValueKey;

public interface OptionValueService {
    ResponeModelJson fetchAll();

    ResponeModelJson createNewOptionValue(OptionValueModel optionValueModel);


    ResponeModelJson getDetailOptionValueById(Long Id);

    ResponeModelJson updateOpptionValue(OptionValueModel optionValueModel);

    ResponeModelJson delete(OptionValueKey optionValueKey);
}
