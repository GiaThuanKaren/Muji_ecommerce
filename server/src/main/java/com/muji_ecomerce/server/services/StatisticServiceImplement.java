package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.OrderDetailRepository;
import com.muji_ecomerce.server.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class StatisticServiceImplement implements StatisticService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public ResponeModelJson Top5Employee() {
        return new ResponeModelJson(HttpStatus.OK, "OKE", orderRepository.Top5EmployeeSale());
    }

    @Override
    public ResponeModelJson Top5Customer() {
        return new ResponeModelJson(HttpStatus.OK, "OKE", orderRepository.Top5CustomerBuy());
    }

    @Override
    public ResponeModelJson Top10Product() {
        return new ResponeModelJson(HttpStatus.OK, "OKE", orderDetailRepository.Top10ProductSale());
    }

    @Override
    public ResponeModelJson RevenueInMonth() {
        return new ResponeModelJson(HttpStatus.OK, "OKE", orderDetailRepository.RevenueInMonth());
    }

    @Override
    public ResponeModelJson RevenueInWeekly() {
        return new ResponeModelJson(HttpStatus.OK, "OKE", orderDetailRepository.RevenueInWeekly());
    }
}
