package com.muji_ecomerce.server.services;

public interface EmailService {
    void sendMail(String toEmail,String subjectEmail,String bodyEmail);
}
