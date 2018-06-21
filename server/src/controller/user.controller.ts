import * as passport from 'passport';

import { controller, httpPost, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import {
  UserAuthenticationRepository,
} from '../service/user-authentication';

import { validateRegisterInput } from '../validation/register';
import { validateLoginInput } from '../validation/login';

import { User } from '../../Interfaces/User';

@controller('/api/users')
export class UserController {

  constructor(@inject(UserAuthenticationRepository) private userAuthenticationRepository: UserAuthenticationRepository) { }

  @httpPost('/register')
  public postRegister(request: Request, response: Response): Promise<Response | User> | Response {
    const { errors, isValid } = validateRegisterInput(request.body);

    if (!isValid) {
      return response.status(400).json(errors);
    }

    return this.userAuthenticationRepository.registerUser(request.body)
      .catch((err) => {
        return response.status(400).json(err);
      });
  }

  @httpPost('/login')
  public postLogin(request: Request, response: Response): Promise<Response | { success: boolean, token: string }> | Response {
    const { errors, isValid } = validateLoginInput(request.body);

    if (!isValid) {
      return response.status(400).json(errors);
    }

    return this.userAuthenticationRepository.loginUser(request.body)
      .catch((err) => {
        return response.status(400).json(err);
      });
  }

  @httpGet('/current', passport.authenticate('jwt', { session: false }))
  public getCurrentUser(request: Request, response: Response): Response {
    const { user } = request;

    if (user) {
      return response.json({
        id: user.id,
        name: user.name,
        email: user.email
      });
    } else {
      return response.json({ error: true });
    }
  }
}
