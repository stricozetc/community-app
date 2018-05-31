import { controller, httpGet } from 'inversify-express-utils';
import { Request } from 'express';
import { inject } from 'inversify';
import { LoggerService } from '../service';

@controller('/api')
export class HomeController {
  // tslint:disable-next-line:no-empty
  constructor(@inject(LoggerService) private loggerService: LoggerService) { }

  @httpGet('/')
  public getTest(request: Request): string {
    this.loggerService.log('Hello World');

    return 'Test';
  }
}
