package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.model.OrderProductModel;
import com.muji_ecomerce.server.model.ResponeModelJson;

import java.util.List;

public interface StatisticService {
    ResponeModelJson Top5Employee();

    ResponeModelJson Top5Customer();

    ResponeModelJson Top10Product();

    ResponeModelJson RevenueInMonth();

    ResponeModelJson RevenueInWeekly();
}
