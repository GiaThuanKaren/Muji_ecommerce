package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.model.OptionModel;
import com.muji_ecomerce.server.repository.OptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OptionServiceImplement implements OptionService{

    @Autowired
    private OptionRepository optionRepository;

    @Override
    public Option createNew(OptionModel optionModel) {
        Option option = new Option();
//        option.setOptionID(optionModel.getOptionID());
        option.setOptionName(optionModel.getOptionName());
        return optionRepository.save(option);
    }
}
