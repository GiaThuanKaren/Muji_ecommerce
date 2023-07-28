package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.model.OptionModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.OptionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/option")
public class OptionController {

    @Autowired
    private OptionService optionService;

    @PostMapping("/create_new")
    public ResponeModelJson creatNew(@RequestBody OptionModel optionModel){
        System.out.println(optionModel);
        Option optionCreated = optionService.createNew(optionModel);
        if(optionCreated!=null)
            return new ResponeModelJson(HttpStatus.CREATED,"Done",optionCreated);
        else
            return new ResponeModelJson(HttpStatus.CONFLICT,"Error");
    }


}
