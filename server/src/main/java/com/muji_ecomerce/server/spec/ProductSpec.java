package com.muji_ecomerce.server.spec;

import com.muji_ecomerce.server.entity.*;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.thymeleaf.util.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ProductSpec {

    public static Specification<Product> getSpecFindCategories(Long _idCategories) {
        return ((root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("categories").get("catorgoryID"), _idCategories);
        });
    }

    public static Specification<Product> getSpecFindName(String _name) {
        return ((root, query, criteriaBuilder) -> {
            return criteriaBuilder.like(root.get("nameProduct"), "%" + _name + "%");
        });
    }

    public static Specification<Product> getSpecFilterSize(String[] _sizes) {
        return ((root, query, criteriaBuilder) -> {
            Join<Product, Product_Option> productProductOptionJoin = root.join("products");
            Join<Product, Option> productOptionOptionJoin = productProductOptionJoin.join("option");
            Join<Option, Option_value> optionOptionValueJoin = productOptionOptionJoin.join("optionValues");

            List<Predicate> predicate = new ArrayList<>();
            if (_sizes != null && _sizes.length > 0) {
                Predicate[] sizePredicates = new Predicate[_sizes.length];
                for (int i = 0; i < _sizes.length; i++) {
                    sizePredicates[i] = criteriaBuilder.equal(optionOptionValueJoin.get("valuesName"), _sizes[i]);
                }
                predicate.add(criteriaBuilder.or(sizePredicates));
            }

            return criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        });
    }

    public static Specification<Product> getSpecFilterColor(String[] _colors) {
        return ((root, query, criteriaBuilder) -> {
            Join<Product, Product_Option> productProductOptionJoin = root.join("products");
            Join<Product, Option> productOptionOptionJoin = productProductOptionJoin.join("option");
            Join<Option, Option_value> optionOptionValueJoin = productOptionOptionJoin.join("optionValues");

            List<Predicate> predicate = new ArrayList<>();
            if (_colors != null && _colors.length > 0) {
                Predicate[] colorPredicates = new Predicate[_colors.length];
                for (int i = 0; i < _colors.length; i++) {
                    colorPredicates[i] = criteriaBuilder.equal(optionOptionValueJoin.get("valuesName"), _colors[i]);
                }
                predicate.add(criteriaBuilder.or(colorPredicates));
            }

            return criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        });
    }

    public static Specification<Product> getSpecFilterPrice(double _minPrice, double _maxPrice) {
        return ((root, query, criteriaBuilder) -> {
            Join<Product, Product_Sku> productProductSkuJoin = root.join("productSkus");
            query.groupBy(root.get("productId"));

            return criteriaBuilder.between(productProductSkuJoin.get("price"), _minPrice, _maxPrice);
        });
    }
}
