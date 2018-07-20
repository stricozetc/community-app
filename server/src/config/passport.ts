import * as jwt from 'passport-jwt';

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
import { keys } from './keys';
import { db } from './../../models/SequelizeConnect';
import { UserModel } from './../../models/user';
import { PassportStatic } from 'passport';
import { PassportOptions } from '../../interfaces/PassportOptions';
import { User } from './../../Interfaces/User';

const options: PassportOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
};

export let passportConfig = (passport: PassportStatic) => {
    passport.use(new JWTStrategy(options, (jwt_payload, done) => {
        db.connect.sync()
            .then(() => {
                return UserModel.findById(jwt_payload.id);
            })
            .then((user: User) => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false, {message: 'User is not found'});
            })
            .catch((err: any) => done(err));
    }));
};
