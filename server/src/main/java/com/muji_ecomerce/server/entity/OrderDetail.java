package com.muji_ecomerce.server.entity;

import com.muji_ecomerce.server.utils.Order_Product_Key;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class OrderDetail {
    @EmbeddedId
    Order_Product_Key id;


    public OrderDetail(     Order_Product_Key id,
                            Product product,
                            OrderProduct orderProduct,
                            int quantityOrdered
    ){
        this.id=id;
        this.product= product;
        this.orderProduct=orderProduct;
        this.quantityOrdered=quantityOrdered;

    }



    @ManyToOne

    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private OrderProduct orderProduct;


    private int quantityOrdered;

    private Long optionId;

    private Long valueId;


//    private float priceEachProduct;


}
