package com.muji_ecomerce.server.utils;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
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
public class Option_Value_Key implements Serializable {
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "option_id")
    private Long optionId;

    @Column(name = "value_id")
    private Long valueId;

    public Option_Value_Key(Long productId, Long optionId) {
        this.productId = productId;
        this.optionId = optionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Option_Value_Key that = (Option_Value_Key) o;
        return Objects.equals(productId, that.productId) && Objects.equals(optionId, that.optionId) && Objects.equals(valueId, that.valueId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, optionId, valueId);
    }
}
