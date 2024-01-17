/*
 * @Explain: 全局异常过滤器
 * @Author: KuAi9
 * @LastEditors: KuAi9
 * @Date: 2024-01-02 15:31:38
 * @LastEditTime: 2024-01-17 11:20:25
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

import logger from '@/global/service/log/logger';

@Catch()
export default class GlobalErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        // 获取请求上下文
        const ctx = host.switchToHttp();
        // 获取请求上下文中的 response 和 request对象
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        // 获取异常状态码
        const status = exception.getStatus();

        // 设置错误信息
        const message = exception.message ? exception.message : status >= 500 ? 'Service Error' : 'Client Error';
        const errorResponse = {
            code: status,
            msg: message,
            data: null,
        };
        // 写入日志
        logger.error(
            `HTTP ${request.method} [${errorResponse.code}] 请求错误: ${errorResponse.msg}`,
            `path: ${request.url}`,
            `\n\t\tquery: ${JSON.stringify(request.query)}\n\t\tbody: ${JSON.stringify(
                request.body,
            )}\n\t\tparams: ${JSON.stringify(request.params)}\n`,
        );
        // 设置返回的状态码， 请求头，发送错误信息
        response.status(status);
        response.statusMessage = 'Bad Request';
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.send(errorResponse);
    }
}
