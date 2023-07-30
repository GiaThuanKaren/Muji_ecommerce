package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.ProductLine;
import com.muji_ecomerce.server.model.ProductLineModel;

import java.util.List;

public interface ProductLineService {
    ProductLine createNew(ProductLineModel productLineModel);

    List<ProductLine> fetchAll();

    ProductLine edit(ProductLineModel productLineModel);

    boolean delete(Long productLineID);

}
