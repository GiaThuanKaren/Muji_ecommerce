package com.muji_ecomerce.server.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Calendar;
import java.util.Date;

@Entity
@Data
public class VerificationTokenCustomer {
    private static final int EXPIRATION = 10;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long verificationTokenCustomerID;

    private String token;

    private Date expirationDate;


    private Date calculateExpirationTime(int expiration) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(new Date().getTime());
        calendar.add(Calendar.MINUTE, expiration);
        return new Date(calendar.getTime().getTime());
    }

    @OneToOne
    @JoinColumn(name ="customer_id")
    private Customer customer;

}
