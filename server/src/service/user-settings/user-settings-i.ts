import { injectable } from 'inversify';

import { UserSettingsRepository } from './user-settings';

import { UserModel } from './../../../models/user';
import { User } from './../../../Interfaces/User';
import * as bcrypt from 'bcryptjs';
import * as passport from 'passport';
import { technicalErr } from '../../../errors/technicalErr';
import { FieldsToChangePassword } from '../../../models/otherModels';
import { logicErr } from '../../../errors/logicErr';
import { ErrorBlock } from './../../../models/error';

@injectable()
export class UserSettingsRepositoryImplementation
  implements UserSettingsRepository {
  public async changePassword(
    fields: FieldsToChangePassword
  ): Promise<{ result: boolean; errors?: ErrorBlock[] }> {
 
    try {
      const { oldPassword, newPassword, userId } = fields;
      let errors: ErrorBlock[] = [];

      let isMatch = false;
      let user = null;
      let salt: string = null;
      try {
        user = await UserModel.findOne({ where: { id: userId } });

      } catch (error) {
        const err = logicErr.notFoundUser;
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

        errors.push(logicErr.wrongPassword(user.email))

        return { result: false, errors };
      }
    } catch (error) {
      throw new Error(error.msg ? error.msg : error.message);
    }
  }
}
