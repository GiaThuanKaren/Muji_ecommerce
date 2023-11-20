package com.muji_ecomerce.server.repository;

import com.muji_ecomerce.server.entity.OrderDetail;
import com.muji_ecomerce.server.utils.Order_Product_Key;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Order_Product_Key> {
    @Query(value = "select product.*, count(order_detail.product_id) as total from order_detail, product WHERE order_detail.product_id = product.product_id GROUP BY order_detail.product_id LIMIT 10", nativeQuery = true)
    List<Map<String, Object>> Top10ProductSale();

    @Query(value = "SELECT YEAR(STR_TO_DATE(order_product.order_date, '%d%m%Y')) AS order_year, MONTH(STR_TO_DATE(order_product.order_date, '%d%m%Y')) AS order_month, SUM(order_detail.quantity_ordered * product_sku.price) AS total_price FROM order_detail INNER JOIN product ON order_detail.product_id = product.product_id INNER JOIN product_sku ON product_sku.product_id = product.product_id INNER JOIN order_product ON order_product.order_id = order_detail.order_id WHERE order_detail.sku_id = product_sku.sku_id AND ( STR_TO_DATE(order_product.order_date, '%d%m%Y') >= DATE_SUB(CURDATE(), INTERVAL 8 MONTH) ) GROUP BY order_year, order_month ORDER BY order_year DESC, order_month DESC;", nativeQuery = true)
    List<Map<String, Object>> RevenueInMonth();

    @Query(value = "SELECT YEAR(STR_TO_DATE(order_product.order_date, '%d%m%Y')) AS order_year, MONTH(STR_TO_DATE(order_product.order_date, '%d%m%Y')) AS order_month, DAYOFWEEK(STR_TO_DATE(order_product.order_date, '%d%m%Y')) AS order_day_of_week, SUM(order_detail.quantity_ordered * product_sku.price) AS total_price FROM order_detail INNER JOIN product ON order_detail.product_id = product.product_id INNER JOIN product_sku ON product_sku.product_id = product.product_id INNER JOIN order_product ON order_product.order_id = order_detail.order_id WHERE order_detail.sku_id = product_sku.sku_id AND STR_TO_DATE(order_product.order_date, '%d%m%Y') >= CURDATE() - INTERVAL 6 DAY GROUP BY order_year, order_month, order_day_of_week;", nativeQuery = true)
    List<Map<String, Object>> RevenueInWeekly();
}
