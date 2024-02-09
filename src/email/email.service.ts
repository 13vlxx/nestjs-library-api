import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './_utils/dto/requests/send-email.dto';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendRegistrationConfirmationEmail(sendEmailDto: SendEmailDto) {
    await this.mailerService.sendMail({
      from: this.configService.getOrThrow('MAIL_SENDER'),
      to: sendEmailDto.toEmail,
      subject: sendEmailDto.subject,
      text: sendEmailDto.content,
    });
  }
}
