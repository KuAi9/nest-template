import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ExampleService } from './example.service';
import { LoginDto } from './dto/example.dto';
import { Auth } from '@/decorator/auth.decorator';

@Controller('example')
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) {}

    /* 登录 */
    @Post('login')
    login(@Body() login: LoginDto) {
        return this.exampleService.login(login);
    }

    /* 注册 */
    @Post('register')
    register(@Body() login: LoginDto) {
        return this.exampleService.register(login);
    }

    /* 获取用户信息 */
    @Auth()
    @Get('getUserInfo')
    getUserInfo(@Req() req) {
        return this.exampleService.getUserInfo(req.user);
    }
}
