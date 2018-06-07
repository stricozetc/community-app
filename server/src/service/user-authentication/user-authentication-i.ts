import { injectable } from "inversify";
import { UserAuthenticationRepository } from './user-authentication';

import { IUser } from './../../../Interfaces/IUser';

import keys from './../../config/keys';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from "./../../../models/user";
import { UserRoles } from "./../../../models/userRoles";
import { Role } from './../../../models/role';
import { IRole } from './../../../Interfaces/IRole';


@injectable()
export class UserAuthenticationRepositoryImplementation implements UserAuthenticationRepository {


    public registerUser(data: IUser): Promise<IUser> {

        return new Promise<IUser>((resolve, reject) => {

            let errors: any = {};
            User.findOne({
                where: { email: data.email }
            }).then((user: IUser) => {
                if (user) {
                    errors.email = 'Email already exist';
                    reject(errors);
                } else {

                  const newUserDate = User.build({
                      name: data.name,
                      email: data.email,
                      password: data.password
                  });

                  bcrypt.genSalt(10, (err, salt) => {
                      bcrypt.hash(data.password, salt, (HashErr, hash) => {
                          if (HashErr) { throw HashErr; }
                          newUserDate.password = hash;
                          newUserDate.save().then((savedUser: IUser) => {
                                Role.findOne({
                                    where: {name: 'user'}
                                }).then((role: IRole ) => {
      
                                UserRoles.upsert({
                                    userId: savedUser.id,
                                    roleId: role.id
                                }).then(() => {
                                    resolve(savedUser);
                                });
                              });
                          }).catch((saveErr: any) => reject(saveErr));
                      });
                  }); 
                }
            });
        });
    }

    public loginUser(data: IUser): Promise<{success: boolean, token: string}> {
       
        return new Promise<{success: boolean, token: string}>((resolve, reject) => {

            const email = data.email;
            const password = data.password;

            let errors: any = {};
            User.findOne({ where: {email} }).then((user: IUser) => {
                if (!user) {
                    errors.email = 'User with this email is not found';
                    reject(errors);
                } else {
                    bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                email: user.email
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
                            errors.password = `Password incorrect for ${user.email}`;
                            reject(errors);
                        }
                    });
                }
            });
        });
    }

    public getUsers(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            User.findAll({}, (error: any, data: string[]) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
