package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.entity.Option_value;
import com.muji_ecomerce.server.entity.Product;
import com.muji_ecomerce.server.model.OptionValueModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.OptionRepository;
import com.muji_ecomerce.server.repository.OptionValueRepsitory;
import com.muji_ecomerce.server.repository.ProductRepository;
import com.muji_ecomerce.server.utils.Option_Value_Key;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OptionValueImplementService implements OptionValueService {

    @Autowired
    private OptionValueRepsitory optionValueRepsitory;

    @Autowired
    private OptionRepository optionRepository;

    @Autowired
    private ProductRepository productRepository;
    @Override
    public ResponeModelJson fetchAll() {
        return new ResponeModelJson(HttpStatus.OK,"Done",optionValueRepsitory.findAll());
    }

    @Override
    public ResponeModelJson createNewOptionValue(OptionValueModel optionValueModel) {
        Option_value optionValue = new Option_value();
        optionValue.setValuesName(optionValueModel.getValue_name());
        Optional<Option > optionFound = optionRepository.findById(optionValueModel.getOption_id());
        Optional<Product> productFound = productRepository.findById(optionValueModel.getProduct_id());
        if(!optionFound.isPresent())
            return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Option Id");
        if(!productFound.isPresent())
            return  new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Product Id");

        optionValue.setOption1(optionFound.get());
        optionValue.setId(new Option_Value_Key(optionValueModel.getProduct_id(), optionValueModel.getOption_id(), optionValueModel.getValue_id()));

        return new ResponeModelJson<>(HttpStatus.CREATED,"OKE", optionValueRepsitory.save(optionValue));
    }


    @Override
    public ResponeModelJson updateOpptionValue(OptionValueModel optionValueModel) {
        Optional<Option_value> optionValueFound =optionValueRepsitory.findById(new Option_Value_Key(optionValueModel.getProduct_id(), optionValueModel.getOption_id(), optionValueModel.getValue_id() ));
        System.out.println(optionValueFound.get().toString() );
        if(optionValueFound.isPresent()){
            Optional<Option > optionFound = optionRepository.findById(optionValueModel.getOption_id());
            Optional<Product> productFound = productRepository.findById(optionValueModel.getProduct_id());
            if(!optionFound.isPresent())
                return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Option Id");
            if(!productFound.isPresent())
                return  new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Product Id");
            optionValueFound.get().setValuesName(optionValueModel.getValue_name());
            optionValueFound.get().setOption1(optionFound.get());

            return new ResponeModelJson<>(
                    HttpStatus.OK,
                    "OKE",
                    optionValueRepsitory.save(optionValueFound.get())
            );
        }
        return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Id Option Value , can not update");
    }

    @Override
    public ResponeModelJson delete(Option_Value_Key optionValueKey) {
        Optional<Option_value> optionValueFound =optionValueRepsitory.findById(optionValueKey);
        if(optionValueFound.isPresent()){
            optionValueRepsitory.deleteById(optionValueKey);
            return new ResponeModelJson(HttpStatus.OK,"OKE");
        }

        return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid option Value Key");
    }
}
