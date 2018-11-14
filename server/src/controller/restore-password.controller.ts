import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { MailerService, UserAuthenticationRepository } from 'service';
import { validateEmail } from 'validation/email';
import { logicErr } from 'errors/logicErr';

@controller('/api/restore-password')
export class RestorePasswordController {
  public constructor(
    @inject(MailerService) private mailerService: MailerService,
    @inject(UserAuthenticationRepository) private userAuthenticationRepository: UserAuthenticationRepository
  ) { }

   /**
    * @param {Request} request - data from request
    * @param {Object} request.body - data from request
    * @param {string} request.body.userEmail - user email
    * the service is sends a message to the email, controller return code 200
    */
  @httpPost('/send-mail')
  public async sendMail(request: Request, response: Response): Promise<Response> {
    const userEmail = request.body.userEmail;

    const { errors, isValid } = validateEmail(userEmail);

    if (!isValid) {
      return response.status(400).json(errors);
    }

    try {
      const isValidEmail = await this.userAuthenticationRepository.checkUserEmail(userEmail);

      if (isValidEmail) {
        this.mailerService.sendRestorePasswordMail(userEmail);
        return response.sendStatus(200);
      } else {
        return response.status(400).send(logicErr.notFoundUser);
      }
    } catch (error) {
      return error.code >= 2000 ?
        response.status(500).json(error) :
        response.status(400).json(error);
    }
  }
}
