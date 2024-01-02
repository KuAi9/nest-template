import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    validate(payload) {
        /*
            payload 为 token 解码后的数据
            此处为：
            {
                id: 'xxx',
                iat: xxx,
                exp: xxx
            }
        */
        // return 的数据将挂载到 request 对象上的 user 上 :  request.user
        return payload.id;
    }
}
