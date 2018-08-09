import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { MailerService, UserAuthenticationRepository } from '../service';

@controller('/api/restore-password')
export class RestorePasswordController {
  public constructor(
    @inject(MailerService) private mailerService: MailerService,
    @inject(UserAuthenticationRepository) private userAuthenticationRepository: UserAuthenticationRepository
  ) {
  }

  @httpPost('/send-mail')
  public async sendMail(request: Request, response: Response): Promise<Response> {
    try {
      const userEmail = request.body.userEmail;
      const isValidEmail = await this.userAuthenticationRepository.checkUserEmail(userEmail);
      console.log('isValidEmail', isValidEmail);
      if (isValidEmail) {
        this.mailerService.sendRestorePasswordMail(userEmail);
        return response.sendStatus(200);
      } else {
        return response.status(400).send('User is not found');
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).send('Fail send mails');
    }
  }
}
