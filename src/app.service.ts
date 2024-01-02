import { Injectable } from '@nestjs/common';

export interface ResType {
    code: number;
    msg: string;
    data: any;
}
export interface SendType extends ResType {
    httpMsg: string;
}
@Injectable()
export class AppService {
    send(code: number, msg = '', data: any = null, httpMsg = ''): SendType {
        return {
            code,
            msg,
            data,
            httpMsg,
        };
    }
}
