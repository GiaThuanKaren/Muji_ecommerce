package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.model.OptionModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.OptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OptionServiceImplement implements OptionService{

    @Autowired
    private OptionRepository optionRepository;

    @Override
    public boolean deleteOptionById(Long id) {
        Optional<Option> optionFound= optionRepository.findById(id);
        if(optionFound.isPresent()){
            optionRepository.deleteById(id);
            return true;
        }
        return  false;
//        return optionRepository.d;
    }

    @Override
    public Option EditOptionById(OptionModel optionModel) {
        Option optionEdit = new Option();
        optionEdit.setOptionID(optionModel.getOptionID());
        optionEdit.setOptionName(optionModel.getOptionName());
        return optionRepository.save(optionEdit);
    }

    @Override
    public List<Option> fetchAll() {
        return optionRepository.findAll();
    }

    @Override
    public ResponeModelJson FetchPaginationOption(Integer _page, Integer _limit) {
        Page<Option> optionPage = optionRepository.findAll(PageRequest.of(_page - 1, _limit));
        List<Option> options = optionPage.getContent();
        return new ResponeModelJson(HttpStatus.OK, "OKE", options);
    }

    @Override
    public ResponeModelJson FetchAllOption() {
        return new ResponeModelJson(HttpStatus.OK,"OKE",optionRepository.findAll());
    }

    @Override
    public Option createNew(OptionModel optionModel) {
        Option option = new Option();
//        option.setOptionID(optionModel.getOptionID());
        option.setOptionName(optionModel.getOptionName());
        return optionRepository.save(option);
    }
}
