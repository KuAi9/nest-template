import { ColumnOptions, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export function CreateDateTime(options?: ColumnOptions) {
    const defaultOptions: ColumnOptions = {
        type: 'timestamp',
        precision: 0,
        default: () => 'CURRENT_TIMESTAMP',
    };
    return CreateDateColumn(Object.assign(defaultOptions, options));
}

export function UpdateDateTime(options?: ColumnOptions) {
    const defaultOptions: ColumnOptions = {
        type: 'timestamp',
        precision: 0,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    };
    return UpdateDateColumn(Object.assign(defaultOptions, options));
}
