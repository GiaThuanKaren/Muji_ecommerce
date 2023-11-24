package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.model.OrderProductModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.OrderService;
import jakarta.mail.MessagingException;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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
    public ResponeModelJson addNewOrder(@RequestBody OrderProductModel orderProductModel) throws MessagingException {
        System.out.println(
                orderProductModel.toString()
        );
        return orderService.addNewOrder(orderProductModel);
//        return new ResponeModelJson<>(HttpStatus.OK,"Done",orderProductModel);
    }


    @GetMapping("/getAllOrderDetailByIdOrder")
    public ResponeModelJson getAllOrderDetailByIdOrder(@RequestParam("id") Long id){
        return orderService.getAllOrderDetailByIdOrder(id);
    }

    @GetMapping("/getAllOrderByIdCustomer")
    public ResponeModelJson getAllOrderByIdCustomer(
            @Param("customer_id") Long customerId
    ){
        return orderService.getAllOrderByIdCustomer(customerId);

    }

}
