package com.muji_ecomerce.server.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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


    private List<ProductOrderPayload> listproductOrdered;




    @Override
    public String toString() {
        return "OrderProductModel{" +
                "orderId=" + orderId +
                ", orderDate='" + orderDate + '\'' +
                ", requiredDate='" + requiredDate + '\'' +
                ", shippedDate='" + shippedDate + '\'' +
                ", customerId=" + customerId +
                ", statusID=" + statusID +
                ", shippingTypeID=" + shippingTypeID ;
    }
}
