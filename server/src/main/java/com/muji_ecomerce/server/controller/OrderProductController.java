package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.model.OrderProductModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderProductController {

    @Autowired
    private OrderService orderService;


    @GetMapping("/getall")
    public ResponeModelJson getAllOrder(){
        return orderService.getAllOrder();
    }

    @PostMapping("/addNew")
    public ResponeModelJson addNewOrder(@RequestBody OrderProductModel orderProductModel){
        System.out.println(
                orderProductModel.toString()
        );
        return orderService.addNewOrder(orderProductModel);
    }



}