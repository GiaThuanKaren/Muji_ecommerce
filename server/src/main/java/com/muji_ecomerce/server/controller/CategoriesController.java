package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.entity.Categories;
import com.muji_ecomerce.server.model.CategoriesModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.CatogoriesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/categories")
public class CategoriesController {

    @Autowired
    private CatogoriesService catogoriesService;

    @PostMapping("/creat_new")
    public ResponeModelJson creatNew(@RequestBody CategoriesModel categoriesModel){
        System.out.println(categoriesModel);
//        return new ResponeModelJson(HttpStatus.CONFLICT,"Done");
        Categories categoriesCreated = catogoriesService.creatNew(categoriesModel);
        if(categoriesCreated != null)
            return new ResponeModelJson(HttpStatus.CREATED,"Done",categoriesCreated);
        else
            return new ResponeModelJson(HttpStatus.CONFLICT,"Done");
    }
//    @GetMapping("/fetchAll")
//    private  ResponeModelJson fetchAll(){
//        return catogoriesService.fetchAll();
//    }

    @GetMapping("/fetchAll")
    public ResponeModelJson fetchAll(
            @RequestParam(required = false) Integer _page,
            @RequestParam(required = false) Integer _limit
    ) {
        if (_page != null && _limit != null) {
            return catogoriesService.FetchPaginationCategories(_page, _limit);
        } else {
            return catogoriesService.fetchAll();
        }
    }

    @PutMapping("/update")
    private ResponeModelJson updateById(@RequestBody CategoriesModel categoriesModel){
        System.out.println(categoriesModel.toString());
        return catogoriesService.updateByID(categoriesModel);
    }

    @DeleteMapping("/delete/{id}")
    private ResponeModelJson delete(@PathVariable("id") Long id){
        return new ResponeModelJson(HttpStatus.OK,"OKe",catogoriesService.DeleteByid(id));
    }
}
