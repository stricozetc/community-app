import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { AppTokenService } from 'service/app-token';
import { validateAppDataInput } from 'validation/register-app';

@controller('/api/v1')
export class RegisterAppController {

    public constructor(
        @inject(AppTokenService) private tokenService: AppTokenService,
    ) { }

    @httpGet('/app-token')
    public async getAppToken(request: Request, response: Response): Promise<Response> {
        const { errors, isValid } = validateAppDataInput(request.query);

        if (!isValid) {
            return response.status(400).json(errors);
        }

        try {
            const newToken = await this.tokenService.create(request.query);

            return response.status(200).send(newToken);
        } catch (error) {
            return error.code >= 2000 ?
                response.status(500).json(error) :
                response.status(400).json(error);
        }
    }
}
