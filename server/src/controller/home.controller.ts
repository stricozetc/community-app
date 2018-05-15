import { controller, httpGet } from 'inversify-express-utils';
import { Request } from 'express';

@controller('/api')
export class HomeController {

  @httpGet('/')
  public getTest(request: Request): string {
    return 'Test';
  }
}
