package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.*;
import com.muji_ecomerce.server.model.OptionValueModel;
import com.muji_ecomerce.server.model.ProductModal;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.*;
import com.muji_ecomerce.server.spec.ProductSpec;
import com.muji_ecomerce.server.utils.OptionValueKey;
import com.muji_ecomerce.server.utils.Product_Option_Key;
import jakarta.persistence.criteria.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.thymeleaf.util.StringUtils;

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
            Integer _page, Integer _limit, String _name,
            String _sizes, String _colors, String _price, String[] _sort
    ) {

        // Split _sizes
        String[] size = {};
        if (!StringUtils.isEmpty(_sizes)) {
            size = _sizes.split(",");
        }

        // Split _colors
        String[] color = {};
        if (!StringUtils.isEmpty(_colors)) {
            color = _colors.split(",");
        }

        double _minPrice = 0;
        double _maxPrice = 0;

        // Min PRICE / Max PRICE
        if (_price != null ) {

            if (_price.equals("<100000")) {
                _minPrice = 1;
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

            List<Product> productListFound = new ArrayList<Product>();
            Long totalProduct = null;
            if (_limit != null && _page != null ) {

                Pageable pageable = PageRequest.of(_page - 1, _limit, Sort.by(orders));

                Page<Product> productPage;
                productPage = FilterProduct(_name, size, color, _minPrice, _maxPrice, pageable);

                productListFound = productPage.getContent();

                totalProduct = productPage.getTotalElements();
            }

            System.out.println("Total product -> " + totalProduct);

            return new ResponeModelJson(HttpStatus.OK, "OKE", productListFound, totalProduct);

        } catch (Exception e) {
            return new ResponeModelJson(HttpStatus.INTERNAL_SERVER_ERROR, "FAIL", null);
        }
    }

    private Page<Product> FilterProduct(String _name, String[] _sizes, String[] _colors, double _minPrice, double _maxPrice, Pageable pageable) {
        Specification<Product> spec = Specification.where(null);

        if (!StringUtils.isEmpty(_name)) {
            spec = spec.and(ProductSpec.getSpecFindName(_name));
        }

        if ((_sizes != null && _sizes.length > 0)) {
            spec = spec.and(ProductSpec.getSpecFilterSize(_sizes));
        }

        if ((_colors != null && _colors.length > 0)) {
            spec = spec.and(ProductSpec.getSpecFilterColor(_colors));
        }

        if (_minPrice != 0 && _maxPrice != 0) {
            spec = spec.and(ProductSpec.getSpecFilterPrice(_minPrice, _maxPrice));
        }

        List<Product> products = productRepository.findAll(spec);
        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), products.size());

        Page<Product> productPage = new PageImpl<Product>(products.subList(start, end), pageable, products.size());

        return productPage;
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

        if (productListFound.size() > 0)
            return new ResponeModelJson(HttpStatus.OK,"OKE",productListFound);
        else
            return new ResponeModelJson(HttpStatus.OK,"Can not find any product with this categories id",productListFound);
    }

    private Page<Product> FilterProductByIdCategories(Long _idCategories, String _name, String[] _sizes, String[] _colors, double _minPrice, double _maxPrice, Pageable pageable) {
        Specification<Product> spec = Specification
                .where(ProductSpec.getSpecFindCategories(_idCategories));

        if (!StringUtils.isEmpty(_name)) {
            spec = spec.and(ProductSpec.getSpecFindName(_name));
        }

        if ((_sizes != null && _sizes.length > 0)) {
            spec = spec.and(ProductSpec.getSpecFilterSize(_sizes));
        }

        if ((_colors != null && _colors.length > 0)) {
            spec = spec.and(ProductSpec.getSpecFilterColor(_colors));
        }

        if (_minPrice != 0 && _maxPrice != 0) {
            spec = spec.and(ProductSpec.getSpecFilterPrice(_minPrice, _maxPrice));
        }

        List<Product> products = productRepository.findAll(spec);
        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), products.size());

        Page<Product> productPage = new PageImpl<Product>(products.subList(start, end), pageable, products.size());

        return productPage;
    }

    @Override
    public ResponeModelJson getProductByIdCategoriesAndFilter(
            Integer _page, Integer _limit, Long _idCategories, String _name,
            String _sizes, String _colors, String _price, String[] _sort
    ) {

        // Split _sizes
        String[] size = {};
        if (!StringUtils.isEmpty(_sizes)) {
            size = _sizes.split(",");
        }

        // Split _colors
        String[] color = {};
        if (!StringUtils.isEmpty(_colors)) {
            color = _colors.split(",");
        }

        double _minPrice = 0;
        double _maxPrice = 0;

        // Min PRICE / Max PRICE
        if (_price != null ) {

            if (_price.equals("<100000")) {
                _minPrice = 1;
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

            List<Product> productListFound = new ArrayList<Product>();
            Long totalProduct = null;
            if (_limit != null && _page != null ) {

                Pageable pageable = PageRequest.of(_page - 1, _limit, Sort.by(orders));

                Page<Product> productPage;
                productPage = FilterProductByIdCategories(_idCategories, _name, size, color, _minPrice, _maxPrice, pageable);

                productListFound = productPage.getContent();

                totalProduct = productPage.getTotalElements();
            }

            System.out.println("Total data --> " + totalProduct);


            return new ResponeModelJson(HttpStatus.OK, "OKE", productListFound, totalProduct);

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
