import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

import logger from '@/global/service/log/logger';

@Injectable()
export default class GlobalResCodeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const httpCtx = context.switchToHttp();
        // 获取请求上下文中的 response 和 request对象
        const response = httpCtx.getResponse<Response>();
        const request = httpCtx.getRequest<Request>();

        return next.handle().pipe(
            map(res => {
                // 失败请求，写入日志
                if (res.code >= 400 && res.code < 500)
                    logger.warn(
                        `HTTP ${request.method} [${String(res.code)}] 请求失败: ${res.msg as string}, ${
                            (res.httpMsg || 'Bad Request') as string
                        }`,
                        `path: ${request.url}`,
                        `\n\t\tquery: ${JSON.stringify(request.query)}\n\t\tbody: ${JSON.stringify(
                            request.body,
                        )}\n\t\tparams: ${JSON.stringify(request.params)}\n`,
                    );
                else if (res.code >= 500) {
                    logger.error(
                        `HTTP ${request.method} [${String(res.code)}] 请求失败: ${res.msg as string}, ${
                            (res.httpMsg || 'Bad Request') as string
                        }`,
                        `path: ${request.url}`,
                        `\n\t\tquery: ${JSON.stringify(request.query)}\n\t\tbody: ${JSON.stringify(
                            request.body,
                        )}\n\t\tparams: ${JSON.stringify(request.params)}\n`,
                    );
                }

                // 设置状态码
                response.status(res.code as number);
                // 设置 http message
                if (res.httpMsg) response.statusMessage = res.httpMsg as string;
                delete res.httpMsg;
                return res;
            }),
        );
    }
}
