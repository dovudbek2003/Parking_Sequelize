import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Park } from "src/modules/park/entities/park.entity";
import { User } from "src/modules/user/entities/user.entity";

@Table({ modelName: 'user_park' })
export class UserPark extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id?: number;

    @ForeignKey(() => User)
    @Column({ field: 'user_id' })
    userId: number;

    @ForeignKey(() => Park)
    @Column({ field: 'park_id' })
    parkId: number;
}
