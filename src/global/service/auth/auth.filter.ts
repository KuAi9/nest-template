import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AuthFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        response.statusMessage = 'Token is Invalid : Please Login Again';
        response.status(401).json({
            code: 401,
            data: null,
            msg: exception.message,
        });
    }
}
