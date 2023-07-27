package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.ProductLine;
import com.muji_ecomerce.server.model.ProductLineModel;

public interface ProductLineService {
    ProductLine createNew(ProductLineModel productLineModel);


}
