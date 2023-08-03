package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.model.OptionValueModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.utils.Option_Value_Key;

public interface OptionValueService {
    ResponeModelJson fetchAll();

    ResponeModelJson createNewOptionValue(OptionValueModel optionValueModel);

    ResponeModelJson updateOpptionValue(OptionValueModel optionValueModel);

    ResponeModelJson delete(Option_Value_Key optionValueKey);
}
