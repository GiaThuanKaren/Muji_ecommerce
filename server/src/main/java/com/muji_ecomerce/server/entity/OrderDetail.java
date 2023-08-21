package com.muji_ecomerce.server.entity;

import com.muji_ecomerce.server.utils.Order_Product_Key;
import jakarta.persistence.*;

@Entity
public class OrderDetail {
    @EmbeddedId
    Order_Product_Key id;

    @ManyToOne

    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private OrderProduct orderProduct;


    private int quantityOrdered;

    private float priceEachProduct;


}
