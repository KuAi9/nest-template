import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './routers/example/example.module';
import envConfig from '../env';
import { AuthModule } from './global/service/auth/auth.module';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            // 将 ConfigModule 设置为全局模块
            isGlobal: true,
            // 设置 自定义 env 路径
            envFilePath: [envConfig.path],
        }),
        // TypeORM
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                // 数据库类型
                type: 'mysql',
                // 数据表实体
                entities: [],
                // 主机，默认为 localhost
                host: configService.get('DB_HOST', 'localhost'),
                // 端口号，默认为 3306
                port: configService.get<number>('DB_PORT', 3306),
                // 数据库用户名，默认为 root
                username: configService.get('DB_USER', 'root'),
                // 数据库密码，默认为 root
                password: configService.get('DB_PASSWORD', 'root'),
                // 数据库名
                database: configService.get('DB_DATABASE', 'test'),
                // 服务器上配置的时区
                timezone: 'local',
                // 日期转字符串
                dateStrings: true,
                // 记录SQL错误日志
                logging: ['error'],
                // 日志保存为文件
                logger: 'file',
                // 根据实体自动创建数据库表， 生产环境不要开启，否则实体改变会导致数据丢失
                synchronize: true,
                // 自动加载实体
                autoLoadEntities: true,
                // 开启缓存
                cache: true,
            }),
        }),
        AuthModule,
        ExampleModule,
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [AppService],
})
export class AppModule {}
