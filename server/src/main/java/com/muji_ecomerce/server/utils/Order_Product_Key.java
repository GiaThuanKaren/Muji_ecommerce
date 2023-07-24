package com.muji_ecomerce.server.utils;

import com.muji_ecomerce.server.entity.OrderProduct;
import com.muji_ecomerce.server.entity.Product;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.io.Serializable;

@Embeddable
public class Order_Product_Key implements Serializable {
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "order_id")
    private Long orderId;

}
