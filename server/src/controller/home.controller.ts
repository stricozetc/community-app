import { controller, httpGet } from 'inversify-express-utils';
import { Request } from 'express';
import { inject } from 'inversify';
import { LoggerService } from '../service';

@controller('/api')
export class HomeController {
  @httpGet('/')
  public getTest(request: Request): string {
    return 'Test';
  }
}
