import logger from '@/global/service/log/logger';

export default function SQLError(err: any, des = '') {
    let msg = '';
    switch (err.errno) {
        case 1062:
            msg = '键冲突';
            break;
        case 1406:
            msg = '超出存储长度';
            break;
        default:
            msg = '未知错误';
            break;
    }
    logger.error(err.sqlMessage, `SQL: ${err.sql}`, `${err.errno} SQLError${des ? ` : ${des}` : ''}`);
    return {
        code: err.errno,
        msg,
        sqlMsg: err.sqlMessage,
        sql: err.sql,
    };
}
