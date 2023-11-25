package com.muji_ecomerce.server.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.hibernate.sql.Template;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

@Service
public class EmailServiceImplement implements EmailService{
    @Autowired
    private JavaMailSender mailSender;
    private TemplateEngine templateEngine = new SpringTemplateEngine();

    public String build(String message) {
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix("templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);
        templateResolver.setCharacterEncoding("UTF-8");

        Context context = new Context();
        context.setVariable("message", message);
        return templateEngine.process("mailTemplate", context);

    }

    @Override
    public void sendMail(String toEmail,String subjectEmail,String tokenAuthen) throws MessagingException {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            String verifyAccount ="http://localhost:3000/account/verifyaccount?token="+tokenAuthen ;
//            if(environment.getActiveProfiles()[0].equals("production"))
//                verifyAccount = "http://localhost:3000/account/verifyaccount";

//            String htmlBody =build(verifyAccount);
//            String htmlBody = emailTemplate(verifyAccount);
//        SimpleMailMessage message = new SimpleMailMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("giathuannguyen213@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject(subjectEmail);
            helper.setText(verifyAccount, true);
//        message.setFrom("giathuannguyen213@gmail.com");
//        message.setTo(toEmail);
//        message.setText(templateEmail);
//        message.setSubject(subjectEmail);

            mailSender.send(message);
            System.out.println("Mail Send Suceesfully");
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Override
    public void sendMailResetPassword(String toEmail, String subjectEmail, String tokenAuthen) throws MessagingException {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            String verifyAccount ="http://localhost:3000/resetpassword?token="+tokenAuthen ;
//            if(environment.getActiveProfiles()[0].equals("production"))
//                verifyAccount = "http://localhost:3000/account/verifyaccount";

//            String htmlBody =build(verifyAccount);
//            String htmlBody = emailTemplate(verifyAccount);
//        SimpleMailMessage message = new SimpleMailMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("giathuannguyen213@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject(subjectEmail);
            helper.setText(verifyAccount, true);
//        message.setFrom("giathuannguyen213@gmail.com");
//        message.setTo(toEmail);
//        message.setText(templateEmail);
//        message.setSubject(subjectEmail);

            mailSender.send(message);
            System.out.println("Mail Send Suceesfully");
        } catch (Exception e) {
            System.out.println(e);
        }
    }


    @Override
    public void sendMailVerifyOrder(String toEmail) throws MessagingException {

        String subjectEmail="" +
                "<html>\n" +
                "<head>\n" +
                "\n" +
                "  <meta charset=\"utf-8\">\n" +
                "  <meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">\n" +
                "  <title>Email Confirmation</title>\n" +
                "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
                "  <style type=\"text/css\">\n" +
                "  /**\n" +
                "   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.\n" +
                "   */\n" +
                "  @media screen {\n" +
                "    @font-face {\n" +
                "      font-family: 'Source Sans Pro';\n" +
                "      font-style: normal;\n" +
                "      font-weight: 400;\n" +
                "      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');\n" +
                "    }\n" +
                "    @font-face {\n" +
                "      font-family: 'Source Sans Pro';\n" +
                "      font-style: normal;\n" +
                "      font-weight: 700;\n" +
                "      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');\n" +
                "    }\n" +
                "  }\n" +
                "  /**\n" +
                "   * Avoid browser level font resizing.\n" +
                "   * 1. Windows Mobile\n" +
                "   * 2. iOS / OSX\n" +
                "   */\n" +
                "  body,\n" +
                "  table,\n" +
                "  td,\n" +
                "  a {\n" +
                "    -ms-text-size-adjust: 100%; /* 1 */\n" +
                "    -webkit-text-size-adjust: 100%; /* 2 */\n" +
                "  }\n" +
                "  /**\n" +
                "   * Remove extra space added to tables and cells in Outlook.\n" +
                "   */\n" +
                "  table,\n" +
                "  td {\n" +
                "    mso-table-rspace: 0pt;\n" +
                "    mso-table-lspace: 0pt;\n" +
                "  }\n" +
                "  /**\n" +
                "   * Better fluid images in Internet Explorer.\n" +
                "   */\n" +
                "  img {\n" +
                "    -ms-interpolation-mode: bicubic;\n" +
                "  }\n" +
                "  /**\n" +
                "   * Remove blue links for iOS devices.\n" +
                "   */\n" +
                "  a[x-apple-data-detectors] {\n" +
                "    font-family: inherit !important;\n" +
                "    font-size: inherit !important;\n" +
                "    font-weight: inherit !important;\n" +
                "    line-height: inherit !important;\n" +
                "    color: inherit !important;\n" +
                "    text-decoration: none !important;\n" +
                "  }\n" +
                "  /**\n" +
                "   * Fix centering issues in Android 4.4.\n" +
                "   */\n" +
                "  div[style*=\"margin: 16px 0;\"] {\n" +
                "    margin: 0 !important;\n" +
                "  }\n" +
                "  body {\n" +
                "    width: 100% !important;\n" +
                "    height: 100% !important;\n" +
                "    padding: 0 !important;\n" +
                "    margin: 0 !important;\n" +
                "  }\n" +
                "  /**\n" +
                "   * Collapse table borders to avoid space between cells.\n" +
                "   */\n" +
                "  table {\n" +
                "    border-collapse: collapse !important;\n" +
                "  }\n" +
                "  a {\n" +
                "    color: #1a82e2;\n" +
                "  }\n" +
                "  img {\n" +
                "    height: auto;\n" +
                "    line-height: 100%;\n" +
                "    text-decoration: none;\n" +
                "    border: 0;\n" +
                "    outline: none;\n" +
                "  }\n" +
                "  </style>\n" +
                "\n" +
                "</head>\n" +
                "<body style=\"background-color: #e9ecef;\">\n" +
                "\n" +
                "  <!-- start preheader -->\n" +
                "  <div class=\"preheader\" style=\"display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;\">\n" +
                "    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.\n" +
                "  </div>\n" +
                "  <!-- end preheader -->\n" +
                "\n" +
                "  <!-- start body -->\n" +
                "  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                "\n" +
                "    <!-- start logo -->\n" +
                "    <tr>\n" +
                "      <td align=\"center\" bgcolor=\"#e9ecef\">\n" +
                "        <!--[if (gte mso 9)|(IE)]>\n" +
                "        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n" +
                "        <tr>\n" +
                "        <td align=\"center\" valign=\"top\" width=\"600\">\n" +
                "        <![endif]-->\n" +
                "        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
                "          <tr>\n" +
                "            <td align=\"center\" valign=\"top\" style=\"padding: 36px 24px;\">\n" +
                "              <a href=\"https://www.blogdesire.com\" target=\"_blank\" style=\"display: inline-block;\">\n" +
                "                <img src=\"https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png\" alt=\"Logo\" border=\"0\" width=\"48\" style=\"display: block; width: 48px; max-width: 48px; min-width: 48px;\">\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </table>\n" +
                "        <!--[if (gte mso 9)|(IE)]>\n" +
                "        </td>\n" +
                "        </tr>\n" +
                "        </table>\n" +
                "        <![endif]-->\n" +
                "      </td>\n" +
                "    </tr>\n" +
                "    <!-- end logo -->\n" +
                "\n" +
                "    <!-- start hero -->\n" +
                "    <tr>\n" +
                "      <td align=\"center\" bgcolor=\"#e9ecef\">\n" +
                "        <!--[if (gte mso 9)|(IE)]>\n" +
                "        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n" +
                "        <tr>\n" +
                "        <td align=\"center\" valign=\"top\" width=\"600\">\n" +
                "        <![endif]-->\n" +
                "        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
                "          <tr>\n" +
                "            <td align=\"left\" bgcolor=\"#ffffff\" style=\"padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;\">\n" +
                "              <h1 style=\"margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;\">Confirm Your Order</h1>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </table>\n" +
                "        <!--[if (gte mso 9)|(IE)]>\n" +
                "        </td>\n" +
                "        </tr>\n" +
                "        </table>\n" +
                "        <![endif]-->\n" +
                "      </td>\n" +
                "    </tr>\n" +
                "    <!-- end hero -->\n" +
                "\n" +
                "    <!-- start copy block -->\n" +
                "    <tr>\n" +
                "      <td align=\"center\" bgcolor=\"#e9ecef\">\n" +
                "        <!--[if (gte mso 9)|(IE)]>\n" +
                "        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n" +
                "        <tr>\n" +
                "        <td align=\"center\" valign=\"top\" width=\"600\">\n" +
                "        <![endif]-->\n" +
                "        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
                "\n" +
                "          <!-- start copy -->\n" +

                "          <!-- end copy -->\n" +
                "\n" +
                "          <!-- start button -->\n" +
                "          <tr>\n" +
                "            <td align=\"left\" bgcolor=\"#ffffff\">\n" +
                "              <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                "                <tr>\n" +
                "                  <td align=\"center\" bgcolor=\"#ffffff\" style=\"padding: 12px;\">\n" +
                "                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
                "                      <tr>\n" +
                "                        <td align=\"center\" bgcolor=\"#1a82e2\" style=\"border-radius: 6px;\">\n" +
                "                          <a href=\"http://localhost:3000/account/orders\" target=\"_blank\" style=\"display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;\">View yours orders</a>\n" +
                "                        </td>\n" +
                "                      </tr>\n" +
                "                    </table>\n" +
                "                  </td>\n" +
                "                </tr>\n" +
                "              </table>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "          <!-- end button -->\n" +
                "\n" +
                "          <!-- start copy -->\n" +

                "          <!-- end copy -->\n" +
                "\n" +
                "          <!-- start copy -->\n" +
                "          <tr>\n" +
                "            <td align=\"left\" bgcolor=\"#ffffff\" style=\"padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf\">\n" +
                "              <p style=\"margin: 0;\">Cheers,<br> Paste</p>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "          <!-- end copy -->\n" +
                "\n" +
                "        </table>\n" +
                "        <!--[if (gte mso 9)|(IE)]>\n" +
                "        </td>\n" +
                "        </tr>\n" +
                "        </table>\n" +
                "        <![endif]-->\n" +
                "      </td>\n" +
                "    </tr>\n" +
                "    <!-- end copy block -->\n" +
                "\n" +
                "    <!-- start footer -->\n" +
                "    <tr>\n" +
                "      <td align=\"center\" bgcolor=\"#e9ecef\" style=\"padding: 24px;\">\n" +
                "        <!--[if (gte mso 9)|(IE)]>\n" +
                "        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n" +
                "        <tr>\n" +
                "        <td align=\"center\" valign=\"top\" width=\"600\">\n" +
                "        <![endif]-->\n" +
                "        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
                "\n" +
                "          <!-- start permission -->\n" +
                "          <tr>\n" +
                "            <td align=\"center\" bgcolor=\"#e9ecef\" style=\"padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;\">\n" +
                "              <p style=\"margin: 0;\">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "          <!-- end permission -->\n" +
                "\n" +
                "          <!-- start unsubscribe -->\n" +
                "          <tr>\n" +
                "            <td align=\"center\" bgcolor=\"#e9ecef\" style=\"padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;\">\n" +
                "              <p style=\"margin: 0;\">To stop receiving these emails, you can <a href=\"https://www.blogdesire.com\" target=\"_blank\">unsubscribe</a> at any time.</p>\n" +
                "              <p style=\"margin: 0;\">Paste 1234 S. Broadway St. City, State 12345</p>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "          <!-- end unsubscribe -->\n" +
                "\n" +
                "        </table>\n" +
                "        <!--[if (gte mso 9)|(IE)]>\n" +
                "        </td>\n" +
                "        </tr>\n" +
                "        </table>\n" +
                "        <![endif]-->\n" +
                "      </td>\n" +
                "    </tr>\n" +
                "    <!-- end footer -->\n" +
                "\n" +
                "  </table>\n" +
                "  <!-- end body -->\n" +
                "\n" +
                "</body>\n" +
                "</html> ";



        try {
            MimeMessage message = mailSender.createMimeMessage();
            String verifyAccount ="http://localhost:3000/resetpassword?token=";
//            if(environment.getActiveProfiles()[0].equals("production"))
//                verifyAccount = "http://localhost:3000/account/verifyaccount";

//            String htmlBody =build(verifyAccount);
//            String htmlBody = emailTemplate(verifyAccount);
//        SimpleMailMessage message = new SimpleMailMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("giathuannguyen213@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject("Verify Order");
            helper.setText(subjectEmail, true);
//        message.setFrom("giathuannguyen213@gmail.com");
//        message.setTo(toEmail);
//        message.setText(templateEmail);
//        message.setSubject(subjectEmail);

            mailSender.send(message);
            System.out.println("Mail Send Suceesfully");
        } catch (Exception e) {
            System.out.println(e);
        }


    }

    private String emailTemplate(String verifyaccount){
        String htmlBody ="<!DOCTYPE html>\n" +
                "<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n" +
                "<head>\n" +
                "    <meta charset=\"utf-8\"> <!-- utf-8 works for most cases -->\n" +
                "    <meta name=\"viewport\" content=\"width=device-width\"> <!-- Forcing initial-scale shouldn't be necessary -->\n" +
                "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <!-- Use the latest (edge) version of IE rendering engine -->\n" +
                "    <meta name=\"x-apple-disable-message-reformatting\">  <!-- Disable auto-scale in iOS 10 Mail entirely -->\n" +
                "    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->\n" +
                "\n" +
                "    <link href=\"https://fonts.googleapis.com/css?family=Lato:300,400,700\" rel=\"stylesheet\">\n" +
                "\n" +
                "    <!-- CSS Reset : BEGIN -->\n" +
                "    <style>\n" +
                "\n" +
                "        /* What it does: Remove spaces around the email design added by some email clients. */\n" +
                "        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */\n" +
                "        html,\n" +
                "body {\n" +
                "    margin: 0 auto !important;\n" +
                "    padding: 0 !important;\n" +
                "    height: 100% !important;\n" +
                "    width: 100% !important;\n" +
                "    background: #f1f1f1;\n" +
                "}\n" +
                "\n" +
                "/* What it does: Stops email clients resizing small text. */\n" +
                "* {\n" +
                "    -ms-text-size-adjust: 100%;\n" +
                "    -webkit-text-size-adjust: 100%;\n" +
                "}\n" +
                "\n" +
                "/* What it does: Centers email on Android 4.4 */\n" +
                "div[style*=\"margin: 16px 0\"] {\n" +
                "    margin: 0 !important;\n" +
                "}\n" +
                "\n" +
                "/* What it does: Stops Outlook from adding extra spacing to tables. */\n" +
                "table,\n" +
                "td {\n" +
                "    mso-table-lspace: 0pt !important;\n" +
                "    mso-table-rspace: 0pt !important;\n" +
                "}\n" +
                "\n" +
                "/* What it does: Fixes webkit padding issue. */\n" +
                "table {\n" +
                "    border-spacing: 0 !important;\n" +
                "    border-collapse: collapse !important;\n" +
                "    table-layout: fixed !important;\n" +
                "    margin: 0 auto !important;\n" +
                "}\n" +
                "\n" +
                "/* What it does: Uses a better rendering method when resizing images in IE. */\n" +
                "img {\n" +
                "    -ms-interpolation-mode:bicubic;\n" +
                "}\n" +
                "\n" +
                "/* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */\n" +
                "a {\n" +
                "    text-decoration: none;\n" +
                "}\n" +
                "\n" +
                "/* What it does: A work-around for email clients meddling in triggered links. */\n" +
                "*[x-apple-data-detectors],  /* iOS */\n" +
                ".unstyle-auto-detected-links *,\n" +
                ".aBn {\n" +
                "    border-bottom: 0 !important;\n" +
                "    cursor: default !important;\n" +
                "    color: inherit !important;\n" +
                "    text-decoration: none !important;\n" +
                "    font-size: inherit !important;\n" +
                "    font-family: inherit !important;\n" +
                "    font-weight: inherit !important;\n" +
                "    line-height: inherit !important;\n" +
                "}\n" +
                "\n" +
                "/* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */\n" +
                ".a6S {\n" +
                "    display: none !important;\n" +
                "    opacity: 0.01 !important;\n" +
                "}\n" +
                "\n" +
                "/* What it does: Prevents Gmail from changing the text color in conversation threads. */\n" +
                ".im {\n" +
                "    color: inherit !important;\n" +
                "}\n" +
                "\n" +
                "/* If the above doesn't work, add a .g-img class to any image in question. */\n" +
                "img.g-img + div {\n" +
                "    display: none !important;\n" +
                "}\n" +
                "\n" +
                "/* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */\n" +
                "/* Create one of these media queries for each additional viewport size you'd like to fix */\n" +
                "\n" +
                "/* iPhone 4, 4S, 5, 5S, 5C, and 5SE */\n" +
                "@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {\n" +
                "    u ~ div .email-container {\n" +
                "        min-width: 320px !important;\n" +
                "    }\n" +
                "}\n" +
                "/* iPhone 6, 6S, 7, 8, and X */\n" +
                "@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {\n" +
                "    u ~ div .email-container {\n" +
                "        min-width: 375px !important;\n" +
                "    }\n" +
                "}\n" +
                "/* iPhone 6+, 7+, and 8+ */\n" +
                "@media only screen and (min-device-width: 414px) {\n" +
                "    u ~ div .email-container {\n" +
                "        min-width: 414px !important;\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "    </style>\n" +
                "\n" +
                "    <!-- CSS Reset : END -->\n" +
                "\n" +
                "    <!-- Progressive Enhancements : BEGIN -->\n" +
                "    <style>\n" +
                "\n" +
                "\t    .primary{\n" +
                "\tbackground: #30e3ca;\n" +
                "}\n" +
                ".bg_white{\n" +
                "\tbackground: #ffffff;\n" +
                "}\n" +
                ".bg_light{\n" +
                "\tbackground: #fafafa;\n" +
                "}\n" +
                ".bg_black{\n" +
                "\tbackground: #000000;\n" +
                "}\n" +
                ".bg_dark{\n" +
                "\tbackground: rgba(0,0,0,.8);\n" +
                "}\n" +
                ".email-section{\n" +
                "\tpadding:2.5em;\n" +
                "}\n" +
                "\n" +
                "/*BUTTON*/\n" +
                ".btn{\n" +
                "\tpadding: 10px 15px;\n" +
                "\tdisplay: inline-block;\n" +
                "}\n" +
                ".btn.btn-primary{\n" +
                "\tborder-radius: 5px;\n" +
                "\tbackground: #30e3ca;\n" +
                "\tcolor: #ffffff;\n" +
                "}\n" +
                ".btn.btn-white{\n" +
                "\tborder-radius: 5px;\n" +
                "\tbackground: #ffffff;\n" +
                "\tcolor: #000000;\n" +
                "}\n" +
                ".btn.btn-white-outline{\n" +
                "\tborder-radius: 5px;\n" +
                "\tbackground: transparent;\n" +
                "\tborder: 1px solid #fff;\n" +
                "\tcolor: #fff;\n" +
                "}\n" +
                ".btn.btn-black-outline{\n" +
                "\tborder-radius: 0px;\n" +
                "\tbackground: transparent;\n" +
                "\tborder: 2px solid #000;\n" +
                "\tcolor: #000;\n" +
                "\tfont-weight: 700;\n" +
                "}\n" +
                "\n" +
                "h1,h2,h3,h4,h5,h6{\n" +
                "\tfont-family: 'Lato', sans-serif;\n" +
                "\tcolor: #000000;\n" +
                "\tmargin-top: 0;\n" +
                "\tfont-weight: 400;\n" +
                "}\n" +
                "\n" +
                "body{\n" +
                "\tfont-family: 'Lato', sans-serif;\n" +
                "\tfont-weight: 400;\n" +
                "\tfont-size: 15px;\n" +
                "\tline-height: 1.8;\n" +
                "\tcolor: rgba(0,0,0,.4);\n" +
                "}\n" +
                "\n" +
                "a{\n" +
                "\tcolor: #30e3ca;\n" +
                "}\n" +
                "\n" +
                "table{\n" +
                "}\n" +
                "/*LOGO*/\n" +
                "\n" +
                ".logo h1{\n" +
                "\tmargin: 0;\n" +
                "}\n" +
                ".logo h1 a{\n" +
                "\tcolor: #30e3ca;\n" +
                "\tfont-size: 24px;\n" +
                "\tfont-weight: 700;\n" +
                "\tfont-family: 'Lato', sans-serif;\n" +
                "}\n" +
                "\n" +
                "/*HERO*/\n" +
                ".hero{\n" +
                "\tposition: relative;\n" +
                "\tz-index: 0;\n" +
                "}\n" +
                "\n" +
                ".hero .text{\n" +
                "\tcolor: rgba(0,0,0,.3);\n" +
                "}\n" +
                ".hero .text h2{\n" +
                "\tcolor: #000;\n" +
                "\tfont-size: 40px;\n" +
                "\tmargin-bottom: 0;\n" +
                "\tfont-weight: 400;\n" +
                "\tline-height: 1.4;\n" +
                "}\n" +
                ".hero .text h3{\n" +
                "\tfont-size: 24px;\n" +
                "\tfont-weight: 300;\n" +
                "}\n" +
                ".hero .text h2 span{\n" +
                "\tfont-weight: 600;\n" +
                "\tcolor: #30e3ca;\n" +
                "}\n" +
                "\n" +
                "\n" +
                "/*HEADING SECTION*/\n" +
                ".heading-section{\n" +
                "}\n" +
                ".heading-section h2{\n" +
                "\tcolor: #000000;\n" +
                "\tfont-size: 28px;\n" +
                "\tmargin-top: 0;\n" +
                "\tline-height: 1.4;\n" +
                "\tfont-weight: 400;\n" +
                "}\n" +
                ".heading-section .subheading{\n" +
                "\tmargin-bottom: 20px !important;\n" +
                "\tdisplay: inline-block;\n" +
                "\tfont-size: 13px;\n" +
                "\ttext-transform: uppercase;\n" +
                "\tletter-spacing: 2px;\n" +
                "\tcolor: rgba(0,0,0,.4);\n" +
                "\tposition: relative;\n" +
                "}\n" +
                ".heading-section .subheading::after{\n" +
                "\tposition: absolute;\n" +
                "\tleft: 0;\n" +
                "\tright: 0;\n" +
                "\tbottom: -10px;\n" +
                "\tcontent: '';\n" +
                "\twidth: 100%;\n" +
                "\theight: 2px;\n" +
                "\tbackground: #30e3ca;\n" +
                "\tmargin: 0 auto;\n" +
                "}\n" +
                "\n" +
                ".heading-section-white{\n" +
                "\tcolor: rgba(255,255,255,.8);\n" +
                "}\n" +
                ".heading-section-white h2{\n" +
                "\tfont-family: \n" +
                "\tline-height: 1;\n" +
                "\tpadding-bottom: 0;\n" +
                "}\n" +
                ".heading-section-white h2{\n" +
                "\tcolor: #ffffff;\n" +
                "}\n" +
                ".heading-section-white .subheading{\n" +
                "\tmargin-bottom: 0;\n" +
                "\tdisplay: inline-block;\n" +
                "\tfont-size: 13px;\n" +
                "\ttext-transform: uppercase;\n" +
                "\tletter-spacing: 2px;\n" +
                "\tcolor: rgba(255,255,255,.4);\n" +
                "}\n" +
                "\n" +
                "\n" +
                "ul.social{\n" +
                "\tpadding: 0;\n" +
                "}\n" +
                "ul.social li{\n" +
                "\tdisplay: inline-block;\n" +
                "\tmargin-right: 10px;\n" +
                "}\n" +
                "\n" +
                "/*FOOTER*/\n" +
                "\n" +
                ".footer{\n" +
                "\tborder-top: 1px solid rgba(0,0,0,.05);\n" +
                "\tcolor: rgba(0,0,0,.5);\n" +
                "}\n" +
                ".footer .heading{\n" +
                "\tcolor: #000;\n" +
                "\tfont-size: 20px;\n" +
                "}\n" +
                ".footer ul{\n" +
                "\tmargin: 0;\n" +
                "\tpadding: 0;\n" +
                "}\n" +
                ".footer ul li{\n" +
                "\tlist-style: none;\n" +
                "\tmargin-bottom: 10px;\n" +
                "}\n" +
                ".footer ul li a{\n" +
                "\tcolor: rgba(0,0,0,1);\n" +
                "}\n" +
                "\n" +
                "\n" +
                "@media screen and (max-width: 500px) {\n" +
                "\n" +
                "\n" +
                "}\n" +
                "\n" +
                "\n" +
                "    </style>\n" +
                "\n" +
                "\n" +
                "</head>\n" +
                "\n" +
                "<body width=\"100%\" style=\"margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;\">\n" +
                "\t<center style=\"width: 100%; background-color: #f1f1f1;\">\n" +
                "    <div style=\"display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;\">\n" +
                "      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;\n" +
                "    </div>\n" +
                "    <div style=\"max-width: 600px; margin: 0 auto;\" class=\"email-container\">\n" +
                "    \t<!-- BEGIN BODY -->\n" +
                "      <table align=\"center\" role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" style=\"margin: auto;\">\n" +
                "      \t<tr>\n" +
                "          <td valign=\"top\" class=\"bg_white\" style=\"padding: 1em 2.5em 0 2.5em;\">\n" +
                "          \t<table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                "          \t\t<tr>\n" +
                "          \t\t\t<td class=\"logo\" style=\"text-align: center;\">\n" +
                "\t\t\t            <h1><a href=\"#\">\n" +
                "                            \n" +
                "                            Yody Ecomerce - Gia Thuan\n" +
                "                        </a></h1>\n" +
                "\t\t\t          </td>\n" +
                "          \t\t</tr>\n" +
                "          \t</table>\n" +
                "          </td>\n" +
                "\t      </tr><!-- end tr -->\n" +
                "\t      <tr>\n" +
                "          <td valign=\"middle\" class=\"hero bg_white\" style=\"padding: 3em 0 2em 0;\">\n" +
                "            <img src=\"https://cdn4.iconfinder.com/data/icons/green-shopper/1049/email.png\" alt=\"\" style=\"width: 300px; max-width: 600px; height: auto; margin: auto; display: block;\">\n" +
                "          </td>\n" +
                "\t      </tr><!-- end tr -->\n" +
                "\t\t\t\t<tr>\n" +
                "          <td valign=\"middle\" class=\"hero bg_white\" style=\"padding: 2em 0 4em 0;\">\n" +
                "            <table>\n" +
                "            \t<tr>\n" +
                "            \t\t<td>\n" +
                "            \t\t\t<div class=\"text\" style=\"padding: 0 2.5em; text-align: center;\">\n" +
                "            \t\t\t\t<h2>Please verify your email</h2>\n" +
                "            \t\t\t\t<h3>Amazing deals, updates, interesting news right in your inbox</h3> <p><a href='%s' class=\"btn btn-primary\">Yes! Subscribe Me</a></p>\n" +
                "            \t\t\t</div>\n" +
                "            \t\t</td>\n" +
                "            \t</tr>\n" +
                "            </table>\n" +
                "          </td>\n" +
                "\t      </tr><!-- end tr -->\n" +
                "      <!-- 1 Column Text + Button : END -->\n" +
                "      </table>\n" +
                "     -->\n" +
                "\n" +
                "    </div>\n" +
                "  </center>\n" +
                "</body>\n" +
                "</html>";

//        return String.format(htmlBody, verifyaccount).toString();
        return htmlBody;
    }
}
