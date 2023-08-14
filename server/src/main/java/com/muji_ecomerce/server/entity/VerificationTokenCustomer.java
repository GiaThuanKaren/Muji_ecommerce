package com.muji_ecomerce.server.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class VerificationTokenCustomer {
    private static final int EXPIRATION = 10;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long verificationTokenCustomerID;

    private String token;

    private Date expirationDate;

    public VerificationTokenCustomer(Customer customer, String token){
        super();
        this.token = token;
        this.customer = customer;
        this.expirationDate = calculateExpirationTime(EXPIRATION);
    }

    public  VerificationTokenCustomer(String token){
        super();
        this.token = token;
        this.expirationDate = calculateExpirationTime(EXPIRATION);
    }

    private Date calculateExpirationTime(int expiration) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(new Date().getTime());
        calendar.add(Calendar.MINUTE, expiration);
        return new Date(calendar.getTime().getTime());
    }

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name ="customer_id")
    private Customer customer;

}
