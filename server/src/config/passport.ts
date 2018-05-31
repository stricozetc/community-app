
import * as jwt from 'passport-jwt';
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
import keys from './keys';
import { db } from './../../models';
import { User } from './../../models/user';
import { PassportStatic } from 'passport';
import { PassportOptions } from '../../Interfaces/PassportOptions';

const options: PassportOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : keys.secretOrKey
};


let passportConfig = (passport: PassportStatic) => {
    passport.use(new JWTStrategy(options, (jwt_payload, done) => {
        db.connect.sync().then(() => {
          
            User.findById(jwt_payload.id)
                .then((user: any) => {
                    if (user) {
                        return done(null, user);
                    }

                    return done(null, false);
                })
                .catch((err: any) => console.log(err));
            });
    }));
};


export { passportConfig };
