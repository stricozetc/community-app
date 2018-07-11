import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import * as uuid from 'uuid/v4';

@controller('/api/v1')
export class RegisterAppController {

  @httpGet('/app-token')
  public getCurrentUser(request: Request, response: Response): Response {
    console.log(request.query);

    return response.status(200).send(uuid());
  }
}
