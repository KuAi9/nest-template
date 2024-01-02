import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CreateDateTime } from '@/decorator/typeorm.decorator';

@Entity('example')
export class ExampleEntity {
    /*
     * id: nanoid 21 位
     */
    @PrimaryColumn({ length: 21 })
    id: string;

    /*
     *  昵称
     */
    @Column({ length: 20, nullable: true, unique: true })
    name: string;

    /*
     *  密码
     */
    @Column({ length: 20, nullable: true })
    password: string;

    /*
     *   注册时间
     */
    @CreateDateTime()
    create_time?: Date;
}
