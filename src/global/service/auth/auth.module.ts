import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3 days' },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
