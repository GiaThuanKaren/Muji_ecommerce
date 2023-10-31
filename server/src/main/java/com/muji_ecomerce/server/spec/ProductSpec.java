package com.muji_ecomerce.server.spec;

import com.muji_ecomerce.server.entity.Option_value;
import com.muji_ecomerce.server.entity.Product;
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

    public static Specification<Product> productOptionValue(String[] _sizes) {
        return ((root, query, criteriaBuilder) -> {
            Join<Product, Option_value> productOption_valueJoin = root.join("Option_value");
            List<Predicate> predicate = new ArrayList<>();
            if (_sizes != null && _sizes.length > 0) {
                for (String size : _sizes) {
                    predicate.add(criteriaBuilder.equal(productOption_valueJoin.get("values_name"), size));
                }
            }
            return criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        });
    }
}
