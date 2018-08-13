
import { injectable, inject } from 'inversify';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid/v4';

import { UserModel } from '../../../models/user';
import { UserRoles } from '../../../models/userRoles';
import { RoleModel } from '../../../models/role';
import { Role } from '../../../Interfaces/Role';
import { logicErr } from '../../../errors/logicErr';

import { keys } from '../../config/keys';
import { UserAuthenticationRepository } from './user-authentication';
import { User } from '../../../Interfaces/User';

import { ErrorBlock } from '../../../models/error';
import { technicalErr } from '../../../errors/technicalErr';
import { LoggerService } from '../logger';

@injectable()
export class UserAuthenticationRepositoryImplementation implements UserAuthenticationRepository {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
    ) { }

    public registerUser(data: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            return UserModel.findOne({
                where: { email: data.email }
            }).then((user: User) => {
                if (user) {
                    return reject(logicErr.userIsAlreadyRegistered);
                }

                const token = uuid();
                const newUserDate = UserModel.build({
                    name: data.name,
                    email: data.email,
                    password: null,
                    token
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        return reject(technicalErr.saltIsNotGenerated);
                    }
                    bcrypt.hash(data.password, salt, (hashErr, hash) => {
                        if (hashErr) {
                            return reject(technicalErr.canNotCreateHash);
                        }
                        newUserDate.password = hash;
                        newUserDate.save().then((savedUser: User) => {
                            RoleModel.findOne().then((role: Role) => {
                                UserRoles.upsert({
                                    userId: savedUser.id,
                                    roleId: role.id
                                }).then((isUpsert) => {
                                    return isUpsert ?
                                        resolve(savedUser) :
                                        reject(technicalErr.userRoleIsNotUpsertedInDb);
                                }).catch((error) => {
                                    this.loggerService.errorLog(error);
                                    return reject(technicalErr.databaseCrash);
                                });
                            }).catch((error) => {
                                this.loggerService.errorLog(error);
                                return reject(technicalErr.databaseCrash);
                            });
                        }).catch(() => {
                            // (Mikalai) I'm not sure about type the error (logic or technical)
                            return reject(technicalErr.userRoleIsNotSaveInDb);
                        });
                    });
                });
            }).catch((error) => {
                this.loggerService.errorLog(error);
                return reject(technicalErr.databaseCrash);
            });
        });
    }

    public loginUser(data: User): Promise<{ success: boolean, token: string }> {
        return new Promise<{ success: boolean, token: string }>((resolve, reject) => {
            const email = data.email;
            const password = data.password;

            UserModel.findOne({ where: { email } }).then((user: User) => {
                if (!user) {
                    return reject(logicErr.notFoundUser);
                } else {
                    bcrypt.compare(password, user.password)
                        .then((isMatch) => {
                            if (isMatch) {
                                const payload = {
                                    id: user.id,
                                    name: user.name,

                                    email: user.email,
                                    token: user.token
                                };
                                jwt.sign(payload, keys.secretOrKey, (err: any, token: string) => {
                                    if (err) {
                                        throw err;
                                    }
                                    resolve({
                                        success: true,
                                        token: 'Bearer ' + token
                                    });
                                });
                            } else {
                                return reject(logicErr.wrongPassword(user.email));
                            }
                        });
                }
            }).catch((error) => {
                this.loggerService.errorLog(error);
                return reject(technicalErr.databaseCrash);
            });
        });
    }
}
