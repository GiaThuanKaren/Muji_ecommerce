package com.muji_ecomerce.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VerifyTokenModel {
    private Long verifyTokenId;

    private String token;

    private Long userid;
}
