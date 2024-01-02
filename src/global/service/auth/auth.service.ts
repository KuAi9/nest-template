/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    /**
     * @function: 生成token
     * @param {string} payload
     * @return {*}
     * @author: KuAi9
     */
    signToken(payload: object) {
        const token = this.jwtService.sign(payload);
        const { exp } = this.jwtService.decode(token);
        return {
            token,
            exp,
        };
    }
}
