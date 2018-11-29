import { injectable } from 'inversify';
import bcrypt from 'bcryptjs';

import { UserSettingsRepository } from './user-settings';

import { ErrorBlock, FieldsToChangePassword, UserModel } from 'models';
import { logicErr, technicalErr } from 'errors';

@injectable()
export class UserSettingsRepositoryImplementation implements UserSettingsRepository {

  public async changePassword(fields: FieldsToChangePassword): Promise<{ result: boolean; errors?: ErrorBlock[] }> {
    try {
      const { oldPassword, newPassword, userId } = fields;
      const errors: ErrorBlock[] = [];

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
        errors.push(logicErr.wrongPassword(user.email));

        return { result: false, errors };
      }
    } catch (error) {
      throw new Error(error.msg ? error.msg : error.message);
    }
  }

  public async setNewPassword(userEmail: string, newPassword: string): Promise<boolean> {
    try {
      let salt: string = '';
      let newHashPassword = '';

      try {
        salt = await bcrypt.genSalt(10);
      } catch (error) {
        console.log(error);
        throw technicalErr.canNotCreateHash;
      }

      try {
        newHashPassword = await bcrypt.hash(newPassword, salt);
      } catch (error) {
        console.log(error);
        throw technicalErr.canNotCreateHash;
      }

      await UserModel.update({ password: newHashPassword }, { where: { email: userEmail } });
      return true;
    } catch (error) {
      if (error.code) {
        throw error;
      } else {
        console.log(error);
        throw technicalErr.databaseCrash;
      }
    }
  }
}
