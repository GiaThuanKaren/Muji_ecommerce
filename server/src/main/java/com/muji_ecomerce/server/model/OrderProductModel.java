package com.muji_ecomerce.server.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class OrderProductModel {
    private Long orderId;

    private String orderDate;

    private String requiredDate;

    private String shippedDate;

    private Long customerId;

    private Long statusID;

    private Long shippingTypeID;

    private Long productId;


    @Override
    public String toString() {
        return "OrderProductModel{" +
                "orderId=" + orderId +
                ", orderDate='" + orderDate + '\'' +
                ", requiredDate='" + requiredDate + '\'' +
                ", shippedDate='" + shippedDate + '\'' +
                ", customerId=" + customerId +
                ", statusID=" + statusID +
                ", shippingTypeID=" + shippingTypeID +
                ", productId=" + productId +
                '}';
    }
}
