package com.muji_ecomerce.server.model;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.util.List;


@Getter
@Setter

public class ResponeModelJson<T>{
    private HttpStatus status;
    private String message;

    T data;

    public ResponeModelJson() {

    }


    public ResponeModelJson(HttpStatus status, String message ) {
        this.status = status  ;
        this.message = message ;
    }

    public ResponeModelJson(HttpStatus status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
