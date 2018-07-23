import { JwtFromRequestFunction } from 'passport-jwt';

export interface PassportOptions {
    jwtFromRequest: JwtFromRequestFunction;
    secretOrKey: string;
}
