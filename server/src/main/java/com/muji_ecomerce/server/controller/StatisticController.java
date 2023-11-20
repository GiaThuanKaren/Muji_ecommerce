package com.muji_ecomerce.server.controller;

import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.services.StatisticService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/statistic")
public class StatisticController {

    @Autowired
    private StatisticService statisticService;

    @GetMapping("/top5EmployeeBestSale")
    public ResponeModelJson top5Employee() {
        return statisticService.Top5Employee();
    }

    @GetMapping("/top5CustomerBuy")
    public ResponeModelJson top5Customer() {
        return statisticService.Top5Customer();
    }

    @GetMapping("/top10ProductBestSale")
    public ResponeModelJson top5Product() {
        return statisticService.Top10Product();
    }

    @GetMapping("/revenueInMonth")
    public ResponeModelJson RevenueInMonth() {
        return statisticService.RevenueInMonth();
    }

    @GetMapping("/revenueInWeekly")
    public ResponeModelJson RevenueInWeekly() {
        return statisticService.RevenueInWeekly();
    }
}
