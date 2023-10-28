package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.*;
import com.muji_ecomerce.server.model.OrderProductModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.CustomerRepository;
import com.muji_ecomerce.server.repository.OrderRepository;
import com.muji_ecomerce.server.repository.ShippingTypeRepository;
import com.muji_ecomerce.server.repository.StatusOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Optional;
@Service
public class OrderServiceImplement implements OrderService{
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ShippingTypeRepository shippingTypeRepository;

    @Autowired
    private StatusOrderRepository statusOrderRepository;

    @Autowired
    private OrderRepository orderRepository;
    @Override
    public ResponeModelJson addNewOrder(OrderProductModel orderProductModel) {
        Optional<Customer> customerFound = customerRepository.findById(orderProductModel.getCustomerId());
        Optional<ShippingType> shippingTypeFound = shippingTypeRepository.findById(orderProductModel.getShippingTypeID());
        Optional<Status> statusFound = statusOrderRepository.findByNameStatus("Ordered");
        if(!customerFound.isPresent()){
            return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Customer Id");
        }
        OrderProduct orderProductNew = new OrderProduct();
        orderProductNew.setOrderDate(new SimpleDateFormat("ddMMyyyy").format(Calendar.getInstance().getTime()).toString());
        orderProductNew.setRequiredDate(new SimpleDateFormat("ddMMyyyy").format(Calendar.getInstance().getTime()).toString());
        orderProductNew.setShippedDate(new SimpleDateFormat("ddMMyyyy").format(Calendar.getInstance().getTime()).toString());
        orderProductNew.setCustomer(customerFound.get());
        orderProductNew.setStatus_order(statusFound.get());
        orderProductNew.setShippingType(shippingTypeFound.get());

        orderRepository.save(orderProductNew);
        return new ResponeModelJson(HttpStatus. OK,"Product ordered",orderProductNew);
    }

    @Override
    public ResponeModelJson getAllOrder() {
        return new ResponeModelJson(HttpStatus.OK,"DOne",orderRepository.findAll());
    }

    @Override
    public ResponeModelJson getAllOrderByIdCustomer(Long customerId) {
        return null;
//        return new ResponeModelJson(HttpStatus.OK,"Done",);
    }
}
