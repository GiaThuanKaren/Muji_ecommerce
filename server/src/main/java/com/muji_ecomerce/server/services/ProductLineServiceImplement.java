package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.ProductLine;
import com.muji_ecomerce.server.model.ProductLineModel;
import com.muji_ecomerce.server.repository.ProductLineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class ProductLineServiceImplement implements  ProductLineService{

    @Autowired
    private ProductLineRepository productLineRepository;
    @Override
    public ProductLine createNew(ProductLineModel productLineModel) {
        ProductLine productLine = new ProductLine();
        productLine.setImageProductLine(productLineModel.getImageProductLine());
        productLine.setNameProductLine(productLineModel.getNameProductLine());
        return productLineRepository.save(productLine);
    }
}
