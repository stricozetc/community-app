import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { AppTokenService } from './../service/app-token';

@controller('/api/v1')
export class RegisterAppController {

    public constructor(@inject(AppTokenService) private tokenService: AppTokenService) {
    }

    @httpGet('/app-token')
    public async getAppToken(request: Request, response: Response): Promise<Response> {
        console.log('get app-token -> ');
        console.log(request.query);

        const newToken = await this.tokenService.create(request.query);

        return response.status(200).send(newToken);
    }
}
