package com.muji_ecomerce.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImplement implements EmailService{
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendMail(String toEmail,String subjectEmail,String bodyEmail){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("giathuannguyen213@gmail.com");
        message.setTo(toEmail);
        message.setText(bodyEmail);
        message.setSubject(subjectEmail);

        mailSender.send(message);
        System.out.println("Mail Send Suceesfully");
    }
}
