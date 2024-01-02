import { IsString, Length } from 'class-validator';

/* 登录 & 注册 */
export class LoginDto {
    /*
     * 昵称
     * @example 'KuAi9'
     */
    @Length(1, 20)
    @IsString()
    readonly name: string;

    /*
     * 密码
     * @example '123456'
     */
    @Length(1, 20)
    @IsString()
    readonly password: string;
}

/* 修改用户信息 */
export class ModUserInfoDto extends LoginDto {
    /*
     * id
     * @example 'abcdefghijklmnopqrstuvwxyz'
     */
    @Length(1, 21)
    @IsString()
    readonly id: string;
}
