import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';

@Table({ modelName: 'cars' })
export class Car extends Model {
    @Column
    model: string;

    @Column({ unique: true })
    index: string

    @ForeignKey(() => User)
    @Column({ field: 'user_id' })
    userId: number;

    @BelongsTo(() => User)
    user: User
}
