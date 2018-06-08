
import * as jwt from 'passport-jwt';
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
import keys from './keys';
import { db } from './../../models/SequalizeConnect';
import { User } from './../../models/user';
import { PassportStatic } from 'passport';
import { PassportOptions } from '../../Interfaces/PassportOptions';
import { IUser } from './../../Interfaces/IUser';

const options: PassportOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : keys.secretOrKey
};


export let passportConfig = (passport: PassportStatic) => {
    passport.use(new JWTStrategy(options, (jwt_payload, done) => {
        db.connect.sync().then(() => {
          
            User.findById(jwt_payload.id)
                .then((user: IUser) => {
                    if (user) {
                        return done(null, user);
                    }

                    return done(null, 'User is not authorized!');
                })
                .catch((err: any) => console.log(err));
            }).catch((err: any) => console.log(err));
    }));
};


