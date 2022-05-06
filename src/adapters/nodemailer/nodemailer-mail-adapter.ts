import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ee6c91124a76dc",
    pass: "d0a0ee39cfa7fe"
  }
}); 

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body,}: SendMailData) {
      await transport.sendMail({
        from: 'Equipe Feedget <ef@feedget.com>',
        to: 'Destinatario <destinatario@email.com>',
        subject,
        html: body,
      });
  };
}