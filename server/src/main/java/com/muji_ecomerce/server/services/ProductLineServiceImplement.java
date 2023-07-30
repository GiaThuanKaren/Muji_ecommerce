package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.ProductLine;
import com.muji_ecomerce.server.model.ProductLineModel;
import com.muji_ecomerce.server.repository.ProductLineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class ProductLineServiceImplement implements  ProductLineService{

    @Autowired
    private ProductLineRepository productLineRepository;


    @Override
    public List<ProductLine> fetchAll() {
        return productLineRepository.findAll();
    }

    @Override
    public boolean delete(Long productLineID) {
        Optional<ProductLine> productLineFound = productLineRepository.findById(productLineID);
        if(productLineFound.isPresent()){
            productLineRepository.deleteById(productLineID);
            return true;
        }
        return false;
    }

    @Override
    public ProductLine edit(ProductLineModel productLineModel) {
        Optional<ProductLine> productLineEdited = productLineRepository.findById(productLineModel.getProductLineId());
        if(productLineEdited.isPresent()){
            productLineEdited.get().setNameProductLine(productLineModel.getNameProductLine());
            productLineEdited.get().setImageProductLine(productLineModel.getImageProductLine());
            return productLineRepository.save(productLineEdited.get());
        }
        return null;
    }

    @Override
    public ProductLine createNew(ProductLineModel productLineModel) {
        ProductLine productLine = new ProductLine();
        productLine.setImageProductLine(productLineModel.getImageProductLine());
        productLine.setNameProductLine(productLineModel.getNameProductLine());
        return productLineRepository.save(productLine);
    }
}
