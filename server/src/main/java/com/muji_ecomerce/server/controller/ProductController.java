package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.entity.Product;
import com.muji_ecomerce.server.model.OptionValueModel;
import com.muji_ecomerce.server.model.ProductModal;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;
    @PostMapping("/create_new")
    private ResponeModelJson createNew(@RequestBody ProductModal productModal){
        ResponeModelJson ResponeModelJsonproduct = productService.createNew(productModal);
        return ResponeModelJsonproduct;
    }

    @PutMapping("/updateVariant")
    private ResponeModelJson updateVariantProduct(@RequestBody OptionValueModel optionValueModel){
        return productService.updateVariantProduct(optionValueModel);
    }

    @PutMapping("/updateProductByID")
    private ResponeModelJson updateProductById(@RequestBody ProductModal productModal){
        System.out.println(productModal.toString());
        return productService.updateProductById(productModal);
    }

    @DeleteMapping("/deleteProduct/{id}")
    private ResponeModelJson deleteProductById(@PathVariable("id") Long id){
        return productService.deleteProductById(id);
    }

//    @GetMapping("/getbyidcategories")
//    private ResponeModelJson getByIdCategories(@RequestParam("idcategories") Long idCategories){
//        return productService.getProductByIdCategories(idCategories);
//    }

        @GetMapping("/getbyidcategoriesfilter")
    private ResponeModelJson getAllByIdCategoriesFilter(
            @RequestParam(required = false) Long _idCategories,
            @RequestParam(required = false) Integer _page,
            @RequestParam(required = false) Integer _limit,
            @RequestParam(required = false) String _name,
            @RequestParam(required = false) String _sizes,
            @RequestParam(required = false) String _colors,
            @RequestParam(required = false) String _price,
            @RequestParam(defaultValue = "nameProduct,desc") String[] _sort) {
        if (_idCategories != null && (_page == null || _limit == null)) {
            return productService.getProductByIdCategories(_idCategories);
        } else {
            return productService.getProductByIdCategoriesAndFilter(
                    _page, _limit, _idCategories, _name, _sizes, _colors, _price, _sort
            );
        }
    }


    @GetMapping("/getproductbyid")
    private ResponeModelJson getDetailProductById(@RequestParam("productid") Long produductID) {
        return productService.getDetailProductByProductId(produductID);
    }

    @GetMapping("/fetchAll")
    private ResponeModelJson getAllByFilter(
            @RequestParam(required = false) Integer _page,
            @RequestParam(required = false) Integer _limit,
            @RequestParam(required = false) String _name,
            @RequestParam(required = false) String _sizes,
            @RequestParam(required = false) String _colors,
            @RequestParam(required = false) String _price,
            @RequestParam(defaultValue = "nameProduct,desc") String[] _sort) {
        if (_page == null || _limit == null) {
            return productService.FetchAllProduct();
        } else {
            return productService.FetchPaginationProduct(
                    _page, _limit, _name, _sizes, _colors, _price, _sort
            );
        }
    }
}
