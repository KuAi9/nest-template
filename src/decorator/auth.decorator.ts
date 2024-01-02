import { applyDecorators, UseFilters, UseGuards } from '@nestjs/common';

import { AuthFilter } from '@/global/service/auth/auth.filter';
import { JWTAuthGuard } from '@/global/service/auth/jwt.Guard';

export function Auth() {
    return applyDecorators(
        // JWT 验证守卫
        UseGuards(JWTAuthGuard),
        // 格式化异常
        UseFilters(new AuthFilter()),
    );
}
