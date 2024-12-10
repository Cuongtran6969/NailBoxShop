package com.spring.nailshop.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

    @NonFinal
    @Value("${spring.mail.from}")
    private String emailForm;

    private String serverName;

    private final JavaMailSender mailSender;

    public void sendMail(List<String> recipents, String subject, String content, MultipartFile[] files)
            throws MessagingException, UnsupportedEncodingException {
        log.info("Email is sending");
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        helper.setFrom(emailForm, "Cuong Tran");
        helper.setTo(recipents.toArray(new String[0]));
        helper.setSubject(subject);
        if (files != null) {
            for (MultipartFile file : files) {
                helper.addAttachment(Objects.requireNonNull(file.getOriginalFilename()), file);
            }
        }
        helper.setText(content, true);
        mailSender.send(mimeMessage);
        log.info("Email is send successfully");
    }
}
