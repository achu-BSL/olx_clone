import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

interface SendMailInterface {
    toEmail: string;
    subject: string,
    text: string;
}


@Injectable()
export class Mailer {
    constructor(private readonly mailService: MailerService) {}

    sendMail({toEmail, subject, text}: SendMailInterface) {
        this.mailService.sendMail({
            from: process.env.USER_EMAIL,
            to: toEmail,
            subject: subject,
            text: text
        })
    }
}