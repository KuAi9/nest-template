import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import logger from '@/global/service/log/logger';
import GlobalErrorFilter from '@/global/error.filter';
import GlobalResCodeInterceptor from './global/resCode.interceptor';
import GlobalValidationPipe from './global/validate.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger });

    // 全局路由前缀
    app.setGlobalPrefix('api');

    // 全局错误过滤器
    app.useGlobalFilters(new GlobalErrorFilter());
    // 全局参数验证管道
    app.useGlobalPipes(new GlobalValidationPipe());
    // 全局响应状态码拦截器
    app.useGlobalInterceptors(new GlobalResCodeInterceptor());

    console.log('各单位注意 2472 端口 已被 Nest.js 征用~');
    console.log('Nest服务器 : http://localhost:2472');
    await app.listen(2472);
}
bootstrap();
