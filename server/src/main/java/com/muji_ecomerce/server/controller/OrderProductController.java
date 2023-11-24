package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.model.OrderProductModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.OrderService;
import com.muji_ecomerce.server.utils.OptionValueKey;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/order")
public class OrderProductController {

    @Autowired
    private OrderService orderService;


    @GetMapping("/getall")
    public ResponeModelJson getAllOrder(
            @RequestParam(required = false) Integer _page,
            @RequestParam(required = false) Integer _limit
    ){
        if (_page != null && _limit != null) {
            return orderService.FetchPaginationOrder(_page, _limit);
        } else {
            return orderService.getAllOrder();
        }
    }

    @PostMapping("/addNew")
    public ResponeModelJson addNewOrder(@RequestBody OrderProductModel orderProductModel){
        return orderService.addNewOrder(orderProductModel);
//        return new ResponeModelJson<>(HttpStatus.OK,"Done",orderProductModel);
    }


    @GetMapping("/getAllOrderDetailByIdOrder")
    public ResponeModelJson getAllOrderDetailByIdOrder(@RequestParam(required = false) Long id){
        return orderService.getAllOrderDetailByIdOrder(id);
    }

    @DeleteMapping("/delete/{id}")
    private ResponeModelJson deleteProductById(@PathVariable("id") Long id){
        return orderService.deleteOrder(id);
    }

}
