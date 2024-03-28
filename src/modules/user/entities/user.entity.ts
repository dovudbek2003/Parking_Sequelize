import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Car } from 'src/modules/car/entities/car.entity';
import { Park } from 'src/modules/park/entities/park.entity';
import { UserPark } from 'src/modules/user_park/entities/user_park.entity';

@Table({ modelName: 'users' })
export class User extends Model {
    @Column({ field: 'phone_number', unique: true, type: DataType.STRING })
    phoneNumber: string;

    @Column
    password: string;

    @Column({ type: DataType.INTEGER })
    balance: number;

    @HasMany(() => Car)
    cars: Array<Car>

    @BelongsToMany(() => Park, () => UserPark)
    parks: Array<Park>
}