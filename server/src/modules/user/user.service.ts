import { Injectable } from "@nestjs/common";
import { Mailer } from "src/utils/mail.util";


@Injectable() 
export class UserService {
    constructor(private readonly mailer: Mailer) {}
    mail() {
        this.mailer.sendMail({toEmail: 'acoading@gmail.com', subject: 'sub', text: 'textt'});
        return 'mail send succesfully';
    }
}