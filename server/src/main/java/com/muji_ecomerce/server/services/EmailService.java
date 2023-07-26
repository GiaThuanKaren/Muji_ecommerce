package com.muji_ecomerce.server.services;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendMail(String toEmail,String subjectEmail,String bodyEmail) throws MessagingException;
}
