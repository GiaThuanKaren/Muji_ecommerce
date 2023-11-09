package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.model.OrderProductModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.OrderService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
//        return new ResponeModelJson<>(HttpStatus.OK,"Done",orderProductModel);
    }


    @GetMapping("/getAllOrderDetailByIdOrder")
    public ResponeModelJson getAllOrderDetailByIdOrder(){
        return orderService.getAllOrderDetailByIdOrder((long)352);
    }



}
