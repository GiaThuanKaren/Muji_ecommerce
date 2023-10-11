package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Function;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.FunctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class FunctionServiceImplement implements FunctionService {

    @Autowired
    private FunctionRepository functionRepository;

    @Override
    public void createNewFunction(String NameFunc) {
        Function function = new Function();
        function.setFunctionName(NameFunc);
        functionRepository.save(function);
    }

    @Override
    public ResponeModelJson FetchAllFunc() {
        return new ResponeModelJson(HttpStatus.OK, "OKE", functionRepository.findAll());
    }
}
