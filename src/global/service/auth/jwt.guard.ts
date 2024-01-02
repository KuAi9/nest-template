import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
    // 自定义认证逻辑
    canActivate(context: ExecutionContext) {
        // 获取请求上下文
        const ctx = context.switchToHttp();
        // 获取请求上下文中的 request对象
        const request = ctx.getRequest<Request>();
        // 获取 token
        const token = request.headers?.authorization?.split(' ')[1];
        // token 不存在，则效验失败
        if (!token) throw new UnauthorizedException('请先登录呢~');

        /*
            如果要确保 token 唯一性，可以将 token 保存到用户表中，在此处读取用户表中的 token 是否 和当前 token 一致，不一致则需要重新登录
            场景：QQ / 微信 同时只能在一处登录
        */

        // 否则 校验 token 是否有效
        return super.canActivate(context);
    }

    // 校验 token 回调
    handleRequest(err: any, id: any, info: any) {
        // 可以抛出一个基于 info 或者 err 参数的异常
        if (err || info || !id) {
            throw new UnauthorizedException('token 已失效，请重新登录呢~');
        }
        return id;
    }
}
