package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.model.OptionValueModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.OptionValueService;
import com.muji_ecomerce.server.utils.Option_Value_Key;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/option_value")
public class OptionValueController {
    @Autowired
    private OptionValueService optionValueService;

    @GetMapping("/fetch_all")
    public ResponeModelJson fetchAll(){
        return optionValueService.fetchAll();
    }

    @PostMapping("/create_new")
    public ResponeModelJson createNewOptionValue(@RequestBody OptionValueModel optionValueModel){
        return optionValueService.createNewOptionValue(optionValueModel);
    }

    @PutMapping("/update")
    public ResponeModelJson updateOptionValue(@RequestBody OptionValueModel optionValueModel){
        return optionValueService.updateOpptionValue(optionValueModel);
    }

    @DeleteMapping("/delete")
    public ResponeModelJson deleteOptionValue(@RequestParam("idproduct") Long productId,@RequestParam("idoption") Long optionid,@RequestParam("idvalue") Long valueid){
        return optionValueService.delete(new Option_Value_Key(productId,optionid,valueid));
    }
}
