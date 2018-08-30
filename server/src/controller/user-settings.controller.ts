import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import passport from 'passport';

import { validateChangePassword } from 'validation/change-password';
import { UserSettingsRepository } from 'service/user-settings/user-settings';

@controller('/api/v1')
export class UserSettingsController1 {
  public constructor(
    @inject(UserSettingsRepository)
    private userSettingsRepository: UserSettingsRepository
  ) { }

  @httpPost('/user-settings/change-password', passport.authenticate('jwt', { session: false }))
  public async postRegister(
    request: Request,
    response: Response
  ): Promise<void | Response> {
    const { errors, isValid } = validateChangePassword(request.body);

    if (!isValid) {
      return response.status(400).json(errors);
    }

    try {
      const res = await this.userSettingsRepository.changePassword(request.body);
      if (res.result) {
          return response.status(200).json(res.result);
        } else {
          return response.status(400).json(res.errors);
        }
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}
