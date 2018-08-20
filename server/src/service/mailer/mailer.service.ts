import { setApiKey, send } from '@sendgrid/mail';
import { injectable, inject } from 'inversify';
import * as fs from 'fs';
import * as format from 'string-template';

import { UserAuthenticationRepository } from '../user-authentication';
import { technicalErr } from '../../../errors/technicalErr';

// tslint:disable-next-line:no-var-requires
const mailConfig = require('../../config/mail.config.json');

@injectable()
export class MailerService {
  constructor(
    @inject(UserAuthenticationRepository) private userAuthenticationRepository: UserAuthenticationRepository
  ) {
    setApiKey(mailConfig.apiKey);
  }

  public async sendRestorePasswordMail(userEmail: string): Promise<void> {
    const language = await this.userAuthenticationRepository.getUserLanguage(userEmail);
    const letterSettings = mailConfig.forgetPassword[language];
    const html: string = fs.readFileSync(letterSettings.htmlLink).toString();
    const messageHTML = format(html, { restoreLink: userEmail });

    const letter = {
      to: userEmail,
      from: mailConfig.helperAddress,
      subject: letterSettings.subject,
      text: format(letterSettings.text, { restoreLink: userEmail }),
      html: messageHTML,
    };
    try {
      send(letter);
    } catch (error) {
      console.log(error);
      throw technicalErr.mailNotSend;
    }
  }
}
