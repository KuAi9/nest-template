import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export default class GlobalValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const errors = await validate(plainToClass(metatype, value) as object);
        if (errors.length > 0) {
            const cause = [];
            for (const err of errors)
                cause.push(`${err.property}: ${err.constraints[Object.keys(err.constraints)[0]]}`);

            throw new BadRequestException('请检查参数~', {
                cause,
            });
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
