import jwt from 'passport-jwt';

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
import { keys } from './keys';
import { db, UserModel } from 'models';
import { PassportStatic } from 'passport';
import { PassportOptions, User } from 'interfaces';

const options: PassportOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
};

export let passportConfig = (passport: PassportStatic) => {
    passport.use(new JWTStrategy(options, async (jwt_payload, done) => {
        try {
            await db.connect.sync();
            const user = await UserModel.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            } else {
                done(null, false, { message: 'User is not found' });
            }
        } catch {
            return (err: any) => done(err);
        }
    }));
};
