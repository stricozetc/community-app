import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';

@controller('/api/restore-password')
export class RestorePasswordController {

  @httpPost('/send-mail')
  public async sendMail(request: Request, response: Response): Promise<Response> {
    console.log('USER EMAIL', request.body);
    return response.sendStatus(200);
  }
}
