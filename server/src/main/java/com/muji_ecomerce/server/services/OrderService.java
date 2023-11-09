package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.Product;
import com.muji_ecomerce.server.model.OrderProductModel;
import com.muji_ecomerce.server.model.ProductModal;
import com.muji_ecomerce.server.model.ResponeModelJson;
import org.springframework.stereotype.Service;


public interface OrderService {
    ResponeModelJson addNewOrder(OrderProductModel orderProductModel);

    ResponeModelJson getAllOrder();

    ResponeModelJson getAllOrderByIdCustomer(Long customerId);


    ResponeModelJson getAllOrderDetailByIdOrder(Long IdOrder);

}
