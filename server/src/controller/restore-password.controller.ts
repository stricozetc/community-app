import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { MailerService } from '../service';

@controller('/api/restore-password')
export class RestorePasswordController {
  public constructor(@inject(MailerService) private mailerService: MailerService) {
  }

  @httpPost('/send-mail')
  public async sendMail(request: Request, response: Response): Promise<Response> {
    try {
      this.mailerService.sendRestorePasswordMail(request.body.userEmail);
      return response.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      return response.sendStatus(500);
    }
  }
}
