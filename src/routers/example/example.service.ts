import { AuthService } from '@/global/service/auth/auth.service';
import { AppService, ResType } from '@/app.service';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/example.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExampleEntity } from './entities/example.entity';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

import SQLError from '@/global/service/log/SQLError';

@Injectable()
export class ExampleService {
    constructor(
        @InjectRepository(ExampleEntity)
        private readonly exampleRepository: Repository<ExampleEntity>,
        private readonly appService: AppService,
        private readonly authService: AuthService,
    ) {}

    /**
     * @function: 登录
     * @param {LoginDto} login 登录数据
     * @return {Promise<ResType>}
     * @author: KuAi9
     */
    async login(login: LoginDto): Promise<ResType> {
        const data = await this.exampleRepository.findOne({ where: { name: login.name } });
        if (data?.name === login.name && data?.password === login.password) {
            return this.appService.send(200, '登录成功', this.authService.signToken({ id: data.id }));
        } else return this.appService.send(403, '账号或密码有误', false);
    }

    /**
     * @function: 注册
     * @param {LoginDto} login 注册数据
     * @return {Promise<ResType>}
     * @author: KuAi9
     */
    async register(login: LoginDto): Promise<ResType> {
        // 生成 token
        const id = nanoid();
        const token = this.authService.signToken({ id });

        try {
            await this.exampleRepository.insert({
                id: nanoid(),
                ...login,
            });
        } catch (err) {
            const SQLErr = SQLError(err, '注册时出错');
            let msg = '';
            if (SQLErr.code === 1062) msg = '该昵称已存在';
            if (SQLErr.code === 1406) msg = '昵称或密码超出长度限制';

            return this.appService.send(403, msg, false);
        }
        return this.appService.send(200, '注册成功', token);
    }

    /**
     * @function: 获取用户信息
     * @param {string} id 用户id
     * @return {Promise<ResType>}
     * @author: KuAi9
     */
    async getUserInfo(id: string): Promise<ResType> {
        const data = await this.exampleRepository.findOne({ where: { id } });
        return this.appService.send(200, '', data);
    }
}
