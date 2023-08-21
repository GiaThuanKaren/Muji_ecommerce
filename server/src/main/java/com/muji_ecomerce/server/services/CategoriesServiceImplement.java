package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Categories;
import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.entity.ProductLine;
import com.muji_ecomerce.server.model.CategoriesModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.CatogoriesRepository;
import com.muji_ecomerce.server.repository.ProductLineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Optional;
@Service
public class CategoriesServiceImplement implements  CatogoriesService{
    @Autowired
    ProductLineRepository productLineRepository;

    @Autowired
    CatogoriesRepository catogoriesRepository;

    @Override
    public boolean DeleteByid(Long id) {
        Optional<Categories> categoriesFound = catogoriesRepository.findById(id);
        if(categoriesFound.isPresent()){
            catogoriesRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public ResponeModelJson updateByID(CategoriesModel categoriesModel) {
        Optional<Categories> categoriesFound = catogoriesRepository.findById(categoriesModel.getCatorgoryID());
        if(categoriesFound.isPresent()){
            categoriesFound.get().setNameCategory(categoriesModel.getNameCategory());
            if(categoriesModel.getParentID()!=null){

                Optional<Categories> parentCategories = catogoriesRepository.findById(categoriesModel.getParentID());
                if(parentCategories.isPresent())

                    categoriesFound.get().setParentID(parentCategories.get());

                else {

                    return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Parent ID");

                }

            }else {
                categoriesFound.get().setParentID(null);
            }

            return new ResponeModelJson(HttpStatus.CREATED,"Oke",catogoriesRepository.save(categoriesFound.get()));
        }
        return new ResponeModelJson(HttpStatus.CONFLICT,"Error");
    }

    @Override
    public Categories creatNew(CategoriesModel categoriesModel) {
//
        Optional<ProductLine> productLine= productLineRepository.findById(categoriesModel.getProduct_lineid());
//        System.out.println();
        if(productLine.isPresent()){

            Categories categories = new Categories();
            categories.setNameCategory(categoriesModel.getNameCategory());
            categories.setImageCategory(categoriesModel.getImageCategory());
            categories.setProductLine(productLine.get());
            if(categoriesModel.getParentID() != null){
                Optional<Categories> categoriesFound = catogoriesRepository.findById(categoriesModel.getParentID());
                if(!categoriesFound.isPresent())
                    return null;
                categories.setParentID(categoriesFound.get());

            }
//

            return  catogoriesRepository.save(categories);
        }

        return null;

    }



    @Override
    public ResponeModelJson fetchAll() {
        return new  ResponeModelJson(HttpStatus.OK,"Done",catogoriesRepository.findAll());
    }
}
