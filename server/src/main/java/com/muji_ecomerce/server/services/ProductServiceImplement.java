package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.*;
import com.muji_ecomerce.server.model.OptionValueModel;
import com.muji_ecomerce.server.model.ProductModal;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.*;
import com.muji_ecomerce.server.spec.ProductSpec;
import com.muji_ecomerce.server.utils.OptionValueKey;
import com.muji_ecomerce.server.utils.Product_Option_Key;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImplement implements  ProductService{
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductOptionRepository productOptionRepository;

    @Autowired
    private OptionRepository optionRepository;
    @Autowired
    private CatogoriesRepository catogoriesRepository;

    @Autowired
    private OptionValueRepsitory optionValueRepsitory;

    private Sort.Direction getSortDirection(String direction) {
        if (direction.equals("asc")) {
            return Sort.Direction.ASC;
        } else if (direction.equals("desc")) {
            return Sort.Direction.DESC;
        }

        return Sort.Direction.ASC;
    }
    @Override
    public ResponeModelJson createNew(ProductModal productModal) {
        Product product = new Product();
        Product_Option productOption = new Product_Option();

        product.setNameProduct(productModal.getNameProduct());
        product.setProductDescription(productModal.getProductDescription());
        product.setQuantityStock(productModal.getQuantityStock());
        Optional<Categories> categoriesFound = catogoriesRepository.findById(productModal.getCategories_id());
        if(categoriesFound.isPresent()){
            product.setCategories(categoriesFound.get());
            List<Product_Option> productOptionList = new ArrayList<>();
            Product productCreated =productRepository.save(product);
            for (Long id : productModal.getList_option()){
                Optional<Option> optionFound = optionRepository.findById(id);
                if(!optionFound.isPresent())
                    return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid OptionID ");

                Product_Option_Key productOptionKey = new Product_Option_Key(productCreated.getProductId(),id);
                Product_Option  productOption1 = new Product_Option();
                productOption1.setId(productOptionKey);
                productOption1.setProduct(productCreated);
                productOption1.setOption(optionFound.get());
                productOptionList.add(productOption1);

            }
            List<Product_Option> optionValueReturn =  productOptionRepository.saveAll(productOptionList);
            return new ResponeModelJson(HttpStatus.CREATED,"Done");
        }
        return new ResponeModelJson(HttpStatus.CONFLICT,"Error");
    }

    @Override
    public ResponeModelJson updateVariantProduct(OptionValueModel optionValueModel) {

        Optional<Option>  optionFound = optionRepository.findById(optionValueModel.getOption_id());
        Optional<Product> productFound= productRepository.findById(optionValueModel.getProduct_id());
        if(!optionFound.isPresent() ){
            return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Option Id");
        }
        if(!productFound.isPresent()){
            return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Product Id");
        }
        Option_value optionValue = new Option_value();
        optionValue.setId(new OptionValueKey(optionValueModel.getProduct_id(),optionValueModel.getOption_id(),optionValueModel.getValue_id() ));
        optionValue.setValuesName(optionValueModel.getValue_name());

        return new ResponeModelJson(HttpStatus.CREATED,"Done",optionValueRepsitory.save(optionValue));

    }


    @Override
    public ResponeModelJson FetchAllProduct() {
        List<Product> productList = productRepository.findAll();
        return new ResponeModelJson(HttpStatus.OK,"Done",productList);
    }


    @Override
    public ResponeModelJson FetchPaginationProduct(
            int _page, int _limit, String _name, String[] _sizes, String _price, String[] _sort
    ) {

        double _minPrice = 0;
        double _maxPrice = 0;

        if (_price.equals("<100000")) {
            _minPrice = 0;
            _maxPrice = 100000;
        } else if (_price.equals(">=100000 AND <=200000")) {
            _minPrice = 100000;
            _maxPrice = 200000;
        } else if (_price.equals(">=200000 AND <=350000")) {
            _minPrice = 200000;
            _maxPrice = 350000;
        } else if (_price.equals(">=350000 AND <=500000")) {
            _minPrice = 350000;
            _maxPrice = 500000;
        } else if (_price.equals(">=500000 AND <=700000")) {
            _minPrice = 500000;
            _maxPrice = 700000;
        } else if (_price.equals(">700000")) {
            _minPrice = 700000;
            _maxPrice = 999999999;
        }

        try {
            List<Sort.Order> orders = new ArrayList<Sort.Order>();

            if (_sort[0].contains(",")) {
                for (String sortOrder : _sort) {
                    String[] __sort = sortOrder.split(",");
                    orders.add(new Sort.Order(getSortDirection(__sort[1]), __sort[0]));
                }
            } else {
                orders.add(new Sort.Order(getSortDirection(_sort[1]), _sort[0]));
            }

            List<Product> products = new ArrayList<Product>();
            Pageable pageable = PageRequest.of(_page - 1, _limit, Sort.by(orders));

            Page<Product> productPage;
            productPage = applyFilters(_name, _sizes, _minPrice, _maxPrice, pageable);

            products = productPage.getContent();

            return new ResponeModelJson(HttpStatus.OK, "OKE", products);

        } catch (Exception e) {
            return new ResponeModelJson(HttpStatus.INTERNAL_SERVER_ERROR, "FAIL", null);
        }
    }

    private Page<Product> applyFilters(String _name, String[] _sizes, double _minPrice, double _maxPrice, Pageable pageable) {

        Specification<Product> spec = Specification.where(ProductSpec.getSpec(_name)).and(ProductSpec.productOptionValue(_sizes, _minPrice, _maxPrice));

        return productRepository.findAll(spec, pageable);
    }

    @Override
    public ResponeModelJson updateProductById(ProductModal productModal) {
        Optional<Product> productFound = productRepository.findById(productModal.getProductId());
        if(productFound.isPresent()){
            productFound.get().setNameProduct(productModal.getNameProduct());
            productFound.get().setProductDescription(productModal.getProductDescription());
            productFound.get().setQuantityStock(productModal.getQuantityStock());
            Optional<Categories> categoriesFound = catogoriesRepository.findById(productModal.getCategories_id());
            if(categoriesFound.isPresent()){
                productFound.get().setCategories(categoriesFound.get());
            }
            else
                return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Categories Id");
            List<Product_Option> productOptionList = new ArrayList<>();
            for (Long id : productModal.getList_option()){
                Optional<Option> optionFound = optionRepository.findById(id);
                if(!optionFound.isPresent())
                    return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid OptionID ");

                Product_Option_Key productOptionKey = new Product_Option_Key(productFound.get().getProductId(),id);
                Product_Option  productOption1 = new Product_Option();
                productOption1.setId(productOptionKey);
                productOption1.setProduct(productFound.get());
                productOption1.setOption(optionFound.get());
                productOptionList.add(productOption1);

            }

            productOptionRepository.saveAll(productOptionList);
            return new ResponeModelJson(
                    HttpStatus.CREATED,"Done"   , productRepository.save(productFound.get())
            );
        }
        return null;
    }

    @Override
    public ResponeModelJson deleteProductById(Long productId) {
        Optional<Product> productFound = productRepository.findById(productId);
        if(productFound.isPresent()){
            productRepository.deleteById(productId);
            return new ResponeModelJson(HttpStatus.OK,"Done");
        }
        else
            return new ResponeModelJson(HttpStatus.CONFLICT,"Can not Delte This Product");

    }

    @Override
    public ResponeModelJson getProductByIdCategories(Long idCategories) {

        List<Product> productListFound = productRepository.findByCategoriesCatorgoryID(idCategories);
        if(productListFound.size()>0)
            return new ResponeModelJson(HttpStatus.OK,"OKE",productListFound);
        else
            return new ResponeModelJson(HttpStatus.OK,"Can not find any product with this categories id",productListFound);
    }

    @Override
    public ResponeModelJson getProductByIdCategoriesAndFilter(
            Integer _page, Integer _limit, Long _idCategories, String _name, String[] _sizes, String _price, String[] _sort
    ) {

        double _minPrice = 0;
        double _maxPrice = 0;

        if (_price != null ) {

            if (_price.equals("<100000")) {
                _minPrice = 0;
                _maxPrice = 100000;
            } else if (_price.equals(">=100000 AND <=200000")) {
                _minPrice = 100000;
                _maxPrice = 200000;
            } else if (_price.equals(">=200000 AND <=350000")) {
                _minPrice = 200000;
                _maxPrice = 350000;
            } else if (_price.equals(">=350000 AND <=500000")) {
                _minPrice = 350000;
                _maxPrice = 500000;
            } else if (_price.equals(">=500000 AND <=700000")) {
                _minPrice = 500000;
                _maxPrice = 700000;
            } else if (_price.equals(">700000")) {
                _minPrice = 700000;
                _maxPrice = 999999999;
            }
        }

        try {
            List<Sort.Order> orders = new ArrayList<Sort.Order>();

            if (_sort[0].contains(",")) {
                for (String sortOrder : _sort) {
                    String[] __sort = sortOrder.split(",");
                    orders.add(new Sort.Order(getSortDirection(__sort[1]), __sort[0]));
                }
            } else {
                orders.add(new Sort.Order(getSortDirection(_sort[1]), _sort[0]));
            }

            List<Product> productListFound = productRepository.findByCategoriesCatorgoryID(_idCategories);

            if (_limit != null && _page != null ) {

                Pageable pageable = PageRequest.of(_page - 1, _limit, Sort.by(orders));

                Page<Product> productPage;

                productPage = applyFilters(_name, _sizes, _minPrice, _maxPrice, pageable);

                productListFound = productPage.getContent();
            }

            return new ResponeModelJson(HttpStatus.OK, "OKE", productListFound);

        } catch (Exception e) {
            return new ResponeModelJson(HttpStatus.INTERNAL_SERVER_ERROR, "FAIL", null);
        }
    }

    @Override
    public ResponeModelJson getDetailProductByProductId(Long ProductId) {
        Optional<Product> productFound = productRepository.findById(ProductId);
        if(productFound.isPresent())
            return new ResponeModelJson(HttpStatus.OK,"OKe",productFound.get());

        return new ResponeModelJson(HttpStatus.NOT_FOUND,"Can not find any product with this productID");
//        return new ResponeModelJson<>();
    }
}
