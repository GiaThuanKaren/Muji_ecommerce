package com.muji_ecomerce.server.utils;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OptionValueKey implements Serializable {
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "option_id")
    private Long optionId;

    @Column(name = "value_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long valueId;



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OptionValueKey that = (OptionValueKey) o;
        return Objects.equals(productId, that.productId) && Objects.equals(optionId, that.optionId) && Objects.equals(valueId, that.valueId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, optionId, valueId);
    }

    @Override
    public String toString() {
        return "Option_Value_Key{" +
                "productId=" + productId +
                ", optionId=" + optionId +
                ", valueId=" + valueId +
                '}';
    }
}
