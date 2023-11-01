package com.muji_ecomerce.server.spec;

import com.muji_ecomerce.server.entity.Option;
import com.muji_ecomerce.server.entity.Option_value;
import com.muji_ecomerce.server.entity.Product;
import com.muji_ecomerce.server.entity.Product_Option;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpec {
    public static Specification<Product> getSpec(String _name) {
        return ((root, query, criteriaBuilder) -> {
            List<Predicate> predicate = new ArrayList<>();
            if (_name != null) {
                predicate.add(criteriaBuilder.like(root.get("nameProduct"), "%" + _name + "%"));
            }

            return criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        });
    }

    public static Specification<Product> productOptionValue(String[] _sizes, double _minPrice, double _maxPrice) {
        return ((root, query, criteriaBuilder) -> {
            Join<Product, Product_Option> productProductOptionJoin = root.join("Product_Option");
            Join<Product_Option, Option> productOptionOptionJoin = productProductOptionJoin.join("Option");
            Join<Option, Option_value> optionOptionValueJoin = productOptionOptionJoin.join("Option_value");

            List<Predicate> predicate = new ArrayList<>();

            if (_sizes != null && _sizes.length > 0) {
                for (String size : _sizes) {
                    predicate.add(criteriaBuilder.equal(optionOptionValueJoin.get("values_name"), size));
                }
            }

            if (_minPrice != 0) {
                predicate.add(criteriaBuilder.greaterThanOrEqualTo(optionOptionValueJoin.get("price"), _minPrice));
            }

            if (_maxPrice != 0) {
                predicate.add(criteriaBuilder.lessThanOrEqualTo(optionOptionValueJoin.get("price"), _maxPrice));
            }
            return criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        });
    }
}
