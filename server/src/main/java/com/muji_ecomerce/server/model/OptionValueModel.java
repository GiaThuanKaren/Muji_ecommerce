package com.muji_ecomerce.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OptionValueModel {
    private Long product_id;

    private Long  option_id;

    private Long  value_id;

    private String value_name;
}
