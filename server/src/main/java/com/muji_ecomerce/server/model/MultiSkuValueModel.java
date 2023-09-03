package com.muji_ecomerce.server.model;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MultiSkuValueModel {
    private Long productId;

    private Long skuId;

    private List<BodySkuValue> arrId;

    @Getter
    public class BodySkuValue{
        public Long optionId;
        public Long valuesId;

        public Long getOptionId() {
            return optionId;
        }

        public void setOptionId(Long optionId) {
            this.optionId = optionId;
        }

        public Long getValuesId() {
            return valuesId;
        }

        public void setValuesId(Long valuesId) {
            this.valuesId = valuesId;
        }
    }


}
