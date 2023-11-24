package com.muji_ecomerce.server.services;

import com.muji_ecomerce.server.entity.*;
import com.muji_ecomerce.server.model.OrderProductModel;
import com.muji_ecomerce.server.model.ResponeModelJson;
import com.muji_ecomerce.server.repository.*;
import com.muji_ecomerce.server.utils.Order_Product_Key;
import com.muji_ecomerce.server.utils.Sku_Values_Key;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
@Service
public class OrderServiceImplement implements OrderService{
    @Autowired
    private CustomerRepository customerRepository;


    @Autowired
    private EmailService emailService;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private ShippingTypeRepository shippingTypeRepository;

    @Autowired
    private StatusOrderRepository statusOrderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;


    @Autowired
    private SkuValuesRepository skuValuesRepository;

    @Autowired
    private EmployeeRepository employeeRepository;
    @Override
    public ResponeModelJson addNewOrder(OrderProductModel orderProductModel) throws MessagingException {
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
        if(orderProductModel.getEmployeeId() != null ){
            Optional<Employee> employeeFound = employeeRepository.findById(
                    orderProductModel.getEmployeeId()
            );
            if(!employeeFound.isPresent())
                return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Employee ID");

            orderProductNew.setEmployee(
                    employeeFound.get()
            );
        }
        OrderProduct orderProductCreated =orderRepository.save(orderProductNew);

        List<OrderDetail> orderDetailsList= new ArrayList<>();
        for(int i =0;i<orderProductModel.getListproductOrdered().size();i++){
            Long productId=orderProductModel.getListproductOrdered().get(i).getProductId();
            Optional<Product>  productFound = productRepository.findById(productId);
            if(!productFound.isPresent())
                return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Product Id");

            Optional<Sku_values> skuValuesFound = skuValuesRepository
                    .findById(new Sku_Values_Key(
                            orderProductModel.getListproductOrdered().get(i).getProductId(),
                            orderProductModel.getListproductOrdered().get(i).getSkuId(),
                            orderProductModel.getListproductOrdered().get(i).getOptionId(),
                            orderProductModel.getListproductOrdered().get(i).getValuesId()
                    ));

            if(!skuValuesFound.isPresent())
                return new ResponeModelJson(HttpStatus.CONFLICT,"Invalid Sku Values");


            OrderDetail orderDetailMew=
                    new OrderDetail(
                            new Order_Product_Key(
                                    productId,
                                    orderProductCreated.getOrderId(),
                                    orderProductModel.getListproductOrdered().get(i).getSkuId()
                            ),
                            productFound.get(),
                            orderProductCreated,
                            orderProductModel.getListproductOrdered().get(i).getQuantity(),
                            orderProductModel.getListproductOrdered().get(i).getOptionId(),
                            orderProductModel.getListproductOrdered().get(i).getValuesId()



                    );

//            orderDetailMew.setQuantityOrdered(
//                    orderProductModel.getListproductOrdered().get(i).getQuantity()
//            );
            orderDetailsList.add(
                    orderDetailMew
            );

            skuValuesFound.get().setQuantity(
                    skuValuesFound.get().getQuantity()-
                            orderProductModel.getListproductOrdered().get(i).getQuantity()
            );

            skuValuesRepository.save(skuValuesFound.get());

        }



        orderDetailRepository.saveAll(orderDetailsList);
        emailService.sendMailVerifyOrder(customerFound.get().getCustomerEmail());

        return new ResponeModelJson(HttpStatus. OK,"Product ordered",orderProductNew);
    }

    @Override
    public ResponeModelJson getAllOrder() {
        return new ResponeModelJson(HttpStatus.OK,"DOne",orderRepository.findAll());
    }




    @Override
    public ResponeModelJson getAllOrderByIdCustomer(Long customerId) {
        return new ResponeModelJson(HttpStatus.OK,"Done",orderRepository.findAllOrderByIdCustomer(customerId));

    }

    @Override
    public ResponeModelJson getAllOrderDetailByIdOrder(Long IdOrder) {

        return new ResponeModelJson(HttpStatus.CONFLICT,"Done",orderRepository.findAllOrderAndOrderDetailById(IdOrder));
    }
}
