import { injectable } from "inversify";

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid/v4';

import { UserModel } from "../../../models/user";
import { UserRoles } from "../../../models/userRoles";
import { RoleModel } from '../../../models/role';
import { Role } from '../../../Interfaces/Role';
import { registerErr } from '../../../errors/registerErr';
import keys from '../../config/keys';
import { UserAuthenticationRepository } from './user-authentication';
import { User } from '../../../Interfaces/User';
import { loginErr } from "../../../errors/loginErr";

@injectable()
export class UserAuthenticationRepositoryImplementation implements UserAuthenticationRepository {

    public registerUser(data: User): Promise<User> {

        return new Promise<User>((resolve, reject) => {

            let errors: any = {};
            UserModel.findOne({
                where: { email: data.email }
            }).then((user: User) => {
                if (user) {
                    errors.email = registerErr.userIsAlreadyRegistered;


                    return reject(errors);
                }
                const token = uuid();

                const newUserDate = UserModel.build({
                    name: data.name,
                    email: data.email,
                    password: null,
                    token: token
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        return reject(err); // Technical Err
                    }
                    bcrypt.hash(data.password, salt, (hashErr, hash) => {
                        if (hashErr) {
                            return reject(hashErr);
                        }
                        newUserDate.password = hash;
                        newUserDate.save().then((savedUser: User) => {
                            RoleModel.findOne({
                                where: { name: 'user' }
                            }).then((role: Role) => {

                                UserRoles.upsert({
                                    userId: savedUser.id,
                                    roleId: role.id
                                }).then(() => {
                                    resolve(savedUser);
                                }).catch(() => reject('can not upsert role of user'));
                            }).catch(() => reject('can not find Role'));
                        }).catch(() => reject('can not save User in Db'));
                    });
                });
            }).catch(() => reject('user was not found'));
        });
    }

    public loginUser(data: User): Promise<{ success: boolean, token: string }> {
        return new Promise<{ success: boolean, token: string }>((resolve, reject) => {

            const email = data.email;
            const password = data.password;

            let errors: any = {};
            UserModel.findOne({ where: { email } }).then((user: User) => {
                if (!user) {
                    errors.email = loginErr.notFoundUser;
                }
                if (errors.email) {
                    return reject(errors);
                } else {
                    bcrypt.compare(password, user.password)
                        .then(isMatch => {
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
                                errors.password = loginErr.wrongPassword(user.email);

                                return reject(errors);
                            }
                        });
                }
            }).catch(() => reject('user was not found'));
        });
    }
}
