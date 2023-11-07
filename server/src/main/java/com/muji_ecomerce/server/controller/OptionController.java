package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.model.OptionModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.OptionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/option")
public class OptionController {

    @Autowired
    private OptionService optionService;

    @DeleteMapping("/delete/{id}")
    public ResponeModelJson deleteByid(@PathVariable("id") Long optionID ){
        boolean isDelete = optionService.deleteOptionById(optionID);
        if(isDelete)
            return new ResponeModelJson<>(HttpStatus.OK,"Done");
        return new ResponeModelJson<>(HttpStatus.CONFLICT,"Error");

    }

    @PutMapping("/edit")
    public ResponeModelJson editById(@RequestBody OptionModel optionModel){
        Option optionEdited = optionService.EditOptionById(optionModel);
        if(optionEdited != null)
            return new ResponeModelJson(HttpStatus.OK,"Done",optionEdited);
        return new ResponeModelJson(HttpStatus.CONFLICT,"Error");
    }
    @GetMapping("/fetch_all")
    public ResponeModelJson fetchAll(
            @RequestParam(required = false) Integer _page,
            @RequestParam(required = false) Integer _limit
    ){
        if (_page != null && _limit != null) {
            return optionService.FetchPaginationOption(_page, _limit);
        } else {
            return optionService.FetchAllOption();
        }
//        return new ResponeModelJson(HttpStatus.OK,"Done",optionService.fetchAll());
    }

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
