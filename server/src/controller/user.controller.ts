import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import { UserAuthenticationRepository } from '../service/user-authentication';

import { validateRegisterInput } from '../validation/register';
import { validateLoginInput } from '../validation/login';

import { User } from '../../Interfaces/User';

@controller('/api/users')
export class UserController {

    constructor(@inject(UserAuthenticationRepository) private userAuthenticationRepository: UserAuthenticationRepository) {
    }

    @httpPost('/register')
    public postRegister(request: Request, response: Response): Promise<Response | User> | Response {
        const { errors, isValid } = validateRegisterInput(request.body);

        if (!isValid) {
            return response.status(400).json(errors);
        }

        return this.userAuthenticationRepository.registerUser(request.body)
            .catch((error) => {
                return error.code >= 2000 ?
                    response.status(500).json(error) :
                    response.status(400).json(error);
            });
    }

    @httpPost('/login')
    public postLogin(request: Request, response: Response): Promise<Response | { success: boolean, token: string }> | Response {
        const { errors, isValid } = validateLoginInput(request.body);

        if (!isValid) {
            return response.status(400).json(errors);
        }

        return this.userAuthenticationRepository.loginUser(request.body)
            .catch((error) => {
                return error.code >= 2000 ?
                    response.status(500).json(error) :
                    response.status(400).json(error);
            });
    }
}
