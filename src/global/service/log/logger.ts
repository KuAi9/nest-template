import { ConsoleLogger } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.ms(),
        winston.format.splat(),
        winston.format.label(),
        winston.format.padLevels(),
        winston.format.printf(info => `${info.timestamp as string} ${info.level} :${info.message}\n`),
    ),
    transports: [
        // 错误日志 error
        new DailyRotateFile({
            // 日志文件名 %DATE% 会自动设置为当前日期
            filename: 'logs/%DATE%/error.log',
            // 日志等级
            level: 'error',
            // 最大文件数，可以是文件数也可以是天数，天数加单位"d"，
            maxFiles: '7d',
        }),
        // 报警日志 warn
        new DailyRotateFile({
            // 日志文件名 %DATE% 会自动设置为当前日期
            filename: 'logs/%DATE%/warn.log',
            // 日志等级
            level: 'warn',
            // 最大文件数，可以是文件数也可以是天数，天数加单位"d"，
            maxFiles: '7d',
        }),
        // info
        new DailyRotateFile({
            // 日志文件名 %DATE% 会自动设置为当前日期
            filename: 'logs/%DATE%/info.log',
            // 日志等级
            level: 'info',
            // 最大文件数，可以是文件数也可以是天数，天数加单位"d"，
            maxFiles: '7d',
        }),
    ],
    exceptionHandlers: [new winston.transports.File({ filename: 'logs/exceptions.log' })],
});

class MyNestLogger extends ConsoleLogger {
    /**
     * Write a 'log' level log.
     */
    log(message: string, stack?: string, context?: string) {
        logger.info(`\n\t${message}\n\t执行栈: ${stack || '无'}\n\t上下文: ${context || '无'}`);
        // 控制台输出
        // super.log.call(this, message, stack, context);
    }

    /**
     * Write an 'error' level log.
     */
    error(message: string, stack?: string, context?: string) {
        logger.error(`\n\t${message}\n\t执行栈: ${stack || '无'}\n\t上下文: ${context || '无'}`);
        // 控制台输出
        super.error.call(this, message, `执行栈:${stack || '无执行栈'}`, context || '');
    }

    /**
     * Write a 'warn' level log.
     */
    warn(message: string, stack?: string, context?: string) {
        logger.warn(`\n\t${message}\n\t执行栈: ${stack || '无'}\n\t上下文: ${context || '无'}`);

        // 控制台输出
        if (context) super.warn.call(this, message, stack || '无执行栈', context);
        else if (stack) super.warn.call(this, message, stack);
        else super.warn.call(this, message);
    }

    /**
     * Write a 'debug' level log.
     */
    // debug(message: any, stack?: string, context?: string) {
    //     console.log('debug:', message, stack, context);
    // }

    /**
     * Write a 'verbose' level log.
     */
    // verbose(message: any, stack?: string, context?: string) {
    //     console.log('verbose:', message, stack, context);
    // }
}
export default new MyNestLogger();
