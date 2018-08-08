import { injectable } from 'inversify';
import { setApiKey, send } from '@sendgrid/mail';

// tslint:disable-next-line:no-var-requires
const mailConfig = require('../../config/mail.config.json');

@injectable()
export class MailerService {
  constructor() {
    const apiKey = mailConfig.apiKey;
    setApiKey(apiKey);
  }

  public sendRestorePasswordMail(userEmail: string): void {
    const msg = {
      to: userEmail,
      from: mailConfig.helperAddress,
      subject: 'Востановление пароля',
      // tslint:disable-next-line:max-line-length
      text: 'Вы запросили востановление Вашего пароля на сайте Battle Net. Если Вы этого не делали, проигнорируйте это письмо,Чтобы поменять пароль на другой, пройдите по этой ссылке:  Coming soon. С уважением, Администрация Battle.Net',
      html: ` <div style="margin: 30px 200px;">
      <div style="font-size: 20px;">Востановление пароля</div>
      <div style="padding: 15px 0 0 0; font-size: 18px;">
        <div>Вы запросили востановление Вашего пароля на сайте Battle Net</div>
        <div>
          <b>Если Вы этого не делали</b>, проигнорируйте это письмо</div>
        <div>Чтобы поменять пароль на другой, пройдите по этой ссылке:</div>
        <div style="padding: 15px 0;">
          <a href="https://www.google.by/"> Coming soon</a>
        </div>
        <div>С уважением,</div>
        <div>Администрация Battle.Net</div>
      </div>
    </div>`,
    };
    try {
      send(msg);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
