package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.model.OptionModel;
import com.muji_ecomerce.server.model.ResponeModelJson;

import java.util.List;

public interface OptionService {

    ResponeModelJson FetchPaginationOption(Integer _page, Integer _limit);

    ResponeModelJson FetchAllOption();

    Option createNew(OptionModel optionModel);

    List<Option> fetchAll();

    Option EditOptionById(OptionModel optionModel);

    boolean deleteOptionById(Long id);
}
