package com.muji_ecomerce.server.model;

import lombok.Data;

@Data
public class AuthResponseModel {
    private String accessToken;
    private String tokenType = "Bearer ";

    public AuthResponseModel(String accessToken) {
        this.accessToken = accessToken;
    }
}
