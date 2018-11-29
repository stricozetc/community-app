
import { injectable, inject } from 'inversify';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';

import { RoleModel, UserModel, UserRoles } from 'models';
import { Role, User } from 'interfaces';
import { logicErr, technicalErr } from 'errors';

import { keys } from 'config/keys';
import { UserAuthenticationRepository } from './user-authentication';

import { LoggerService } from '../logger';

@injectable()
export class UserAuthenticationRepositoryImplementation implements UserAuthenticationRepository {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
    ) { }

    public registerUser(data: User): Promise<User> {
        return new Promise<User>(async (resolve, reject) => {
            try {
                const user = await UserModel.findOne({
                    where: { email: data.email }
                });

                if (user) {
                    return reject(logicErr.userIsAlreadyRegistered);
                }

                const token = uuid();
                const newUserDate = UserModel.build({
                    name: data.name,
                    email: data.email,
                    password: null,
                    token,
                    language: data.language
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        return reject(technicalErr.saltIsNotGenerated);
                    }
                    bcrypt.hash(data.password, salt, async (hashErr, hash) => {
                        if (hashErr) {
                            return reject(technicalErr.canNotCreateHash);
                        }
                        newUserDate.password = hash;
                        try {
                            const savedUser: User = await newUserDate.save();
                            try {
                                const role: Role = await RoleModel.findOne();
                                try {
                                    const isUpsert = await UserRoles.upsert({
                                        userId: savedUser.id,
                                        roleId: role.id
                                    });

                                    return isUpsert ?
                                        resolve(savedUser) :
                                        reject(technicalErr.userRoleIsNotUpsertedInDb);
                                } catch (error) {
                                    this.loggerService.errorLog(error);
                                    return reject(technicalErr.databaseCrash);
                                }
                            } catch (error) {
                                this.loggerService.errorLog(error);
                                return reject(technicalErr.databaseCrash);
                            }
                        } catch {
                            return reject(technicalErr.userRoleIsNotSaveInDb);
                        }
                    });
                });
            } catch (error) {
                this.loggerService.errorLog(error);
                return reject(technicalErr.databaseCrash);
            }
        });
    }

    public loginUser(data: User): Promise<{ success: boolean, token: string }> {
        return new Promise<{ success: boolean, token: string }>(async (resolve, reject) => {
            const email = data.email;
            const password = data.password;

            try {
                const user = await UserModel.findOne({ where: { email } });
                if (!user) {
                    return reject(logicErr.notFoundUser);
                } else {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            token: user.token,
                        };
                        jwt.sign(payload, keys.secretOrKey, (error: Error, token: string) => {
                            if (error) {
                                throw error;
                            }
                            resolve({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                    } else {
                        return reject(logicErr.wrongPassword(user.email));
                    }

                }
            } catch (error) {
                this.loggerService.errorLog(error);
                return reject(technicalErr.databaseCrash);
            }
        });
    }

    public async setUserLanguage(userEmail: string, userLanguage: string): Promise<boolean> {
        try {
            await UserModel.update({ language: userLanguage }, { where: { email: userEmail } });
            return true;
        } catch (error) {
            this.loggerService.errorLog(error);
            throw technicalErr.databaseCrash;
        }
    }

    public async getUserLanguage(userEmail: string): Promise<string> {
        try {
            const user: User = await UserModel.findOne({ where: { email: userEmail } });
            if (user) {
                return user.language;
            } else {
                throw logicErr.notFoundUser;
            }
        } catch (error) {
            if (error.code) {
                throw error;
            } else {
                this.loggerService.errorLog(error);
                throw technicalErr.databaseCrash;
            }
        }
    }

    public async checkUserEmail(userEmail: string): Promise<boolean> {
        try {
            const user: User = await UserModel.findOne({ where: { email: userEmail } });
            if (user) {
                return true;
            } else {
                throw logicErr.notFoundEmail;
            }
        } catch (error) {
            this.loggerService.errorLog(error);
            throw technicalErr.databaseCrash;
        }
    }

    public async socialNetworksLogin(
        email: string,
        name: string,
        language: string,
        accessToken: string,
        imageUrl: string
    ): Promise<{ success: boolean, token: string }> {
        return new Promise<{ success: boolean, token: string }>(async (resolve, reject) => {
            try {
                const user: User = await UserModel.findOne({ where: { email } });
                if (user) {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        token: user.token,
                        imageUrl: user.imageUrl,
                    };
                    jwt.sign(payload, keys.secretOrKey, (error: Error, token: string) => {
                        if (error) {
                            throw error;
                        }
                        resolve({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    });
                } else {
                    const uuidToken = uuid();
                    const newUserDate = UserModel.build({
                        name,
                        email,
                        token: uuidToken,
                        language,
                        accessToken,
                        imageUrl,
                    });
                    const savedUser = await newUserDate.save();

                    const userRole: Role = await RoleModel.findOne();
                    const isUpsert = await UserRoles.upsert({
                        userId: savedUser.id,
                        roleId: userRole.id
                    });
                    if (isUpsert) {
                        const payload = {
                            id: savedUser.id,
                            name: savedUser.name,
                            email: savedUser.email,
                            token: savedUser.token,
                            imageUrl: savedUser.imageUrl,
                        };
                        console.log('AAAAAAAAAAAAA', payload);

                        jwt.sign(payload, keys.secretOrKey, (error: Error, token: string) => {
                            if (error) {
                                throw error;
                            }
                            resolve({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                    } else {
                        throw technicalErr.userRoleIsNotUpsertedInDb;
                    }
                }
            } catch (error) {
                if (error.code) {
                    throw error;
                } else {
                    this.loggerService.errorLog(error);
                    throw technicalErr.databaseCrash;
                }
            }
        });
    }
}
