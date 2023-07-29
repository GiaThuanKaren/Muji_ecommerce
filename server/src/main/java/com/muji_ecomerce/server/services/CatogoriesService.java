package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Categories;
import com.muji_ecomerce.server.model.CategoriesModel;
import com.muji_ecomerce.server.model.ResponeModelJson;

public interface CatogoriesService {
    Categories creatNew(CategoriesModel categoriesModel);

    ResponeModelJson fetchAll();
}
