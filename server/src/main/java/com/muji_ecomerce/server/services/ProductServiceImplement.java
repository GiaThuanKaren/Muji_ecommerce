package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Categories;
import com.muji_ecomerce.server.entity.Product;
import com.muji_ecomerce.server.model.ProductModal;
import com.muji_ecomerce.server.repository.CatogoriesRepository;
import com.muji_ecomerce.server.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductServiceImplement implements  ProductService{
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CatogoriesRepository catogoriesRepository;
    @Override
    public Product createNew(ProductModal productModal) {

        Product product = new Product();
        product.setNameProduct(productModal.getNameProduct());
        product.setProductDescription(productModal.getProductDescription());
        product.setQuantityStock(productModal.getQuantityStock());
        Optional<Categories> categoriesFound = catogoriesRepository.findById(productModal.getCategories_id());
        if(categoriesFound.isPresent()){
            product.setCategories(categoriesFound.get());
            return productRepository.save(product);
        }
        return null;
    }
}
