import { injectable } from 'inversify';

import { UserSettingsRepository } from './user-settings';
import { FieldsToChangePassword } from '../../../models/otherModels';
// import {Promise} from 'bluebird';

import { UserModel } from './../../../models/user';
import { User } from './../../../Interfaces/User';
import * as bcrypt from 'bcryptjs';
import { ErrorsToChangePassword } from './../../../models/otherModels';
import { changePasswordErrors } from './../../../errors/changePassword';
import * as passport from 'passport';
import { technicalErr } from '../../../errors/technicalErr';

@injectable()
export class UserSettingsRepositoryImplementation
  implements UserSettingsRepository {
  public async changePassword(
    fields: FieldsToChangePassword
  ): Promise<{ result: boolean; errors?: ErrorsToChangePassword }> {
 
    try {
      const { oldPassword, newPassword, userId } = fields;
      const errors: ErrorsToChangePassword = {
        password: []
      };
      let isMatch = false;
      let user = null;
      let salt: string = null;
      try {
        user = await UserModel.findOne({ where: { id: userId } });

      } catch (error) {
        const err = technicalErr.userIsNotFound;
        throw err;
      }

      try {
        isMatch = await bcrypt.compare(oldPassword, user.password);
      } catch (error) {
        throw new Error(error.message);
      }

      if (isMatch) {
        try {
          salt = await bcrypt.genSalt(10);
        } catch (error) {
          throw new Error(error.message);
        }

        const hash = await bcrypt.hash(newPassword, salt);

        user.password = hash;

        try {
          await UserModel.upsert(user.dataValues);
        } catch (error) {
          throw new Error(error.message);
        }

        return { result: true };
      } else {
        console.log('IS NOT MATCHED');
        errors.password = errors.password.concat(
          changePasswordErrors.oldPasswordShouldBeReal
        );
        console.log('ERRORS', errors);
        return { result: false, errors };
      }
    } catch (error) {
      throw new Error(error.msg ? error.msg : error.message);
    }
  }
}
