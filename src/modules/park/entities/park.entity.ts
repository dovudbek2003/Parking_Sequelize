import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/user/entities/user.entity";
import { UserPark } from "src/modules/user_park/entities/user_park.entity";

@Table({ modelName: 'parks' })
export class Park extends Model {
    @Column
    name: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    capacity: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    price: number;

    @BelongsToMany(() => User, () => UserPark)
    users: Array<User>
}
