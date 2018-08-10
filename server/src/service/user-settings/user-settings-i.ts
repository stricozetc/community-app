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
    // return new Promise((resolve, reject) => {
    //   UserModel.findOne({ where: { id: userId } })
    //     .then((user: any) => {
    //       bcrypt
    //         .compare(oldPassword, user.password)
    //         .then(isMatch => {
    //           if (isMatch) {
    //             bcrypt.genSalt(10, (err, salt) => {
    //               if (err) {
    //                 return reject(err); // technical Err
    //               }
    //               bcrypt.hash(user.password, salt, (hashErr, hash) => {
    //                 if (hashErr) {
    //                   return reject(hashErr);
    //                 }
    //                 user.password = hash;

    //                 console.log('current USer', user);
    //                 UserModel.upsert(user.dataValues)
    //                   .then(() => {
    //                     return resolve(true);
    //                   })
    //                   .catch(err => reject('cannot upsert new user'));
    //               });
    //             });
    //           } else {
    //             console.log('IS NOT MATCHED');
    //             errors.password = errors.password.concat(
    //               changePasswordErrors.oldPasswordShouldBeReal
    //             );

    //             return reject(errors);
    //           }
    //         })
    //         .catch(err => reject('passwords are not matched'));
    //     })
    //     .catch(err => reject(err));
    // });
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
