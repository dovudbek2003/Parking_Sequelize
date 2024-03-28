import { InjectModel } from "@nestjs/sequelize";
import { IUserParkRepository } from "./interfaces/user_park.repository";
import { UserPark } from "./entities/user_park.entity";
import { Sequelize } from "sequelize";


export class UserParkRepository implements IUserParkRepository {
    constructor(
        @InjectModel(UserPark)
        private readonly repository: typeof UserPark
    ) { }


    async insert(userParkEntity: UserPark): Promise<UserPark> {
        return await this.repository.create<UserPark>({
            userId: userParkEntity.userId,
            parkId: userParkEntity.parkId,
        })
    }
    async findAll(): Promise<UserPark[]> {
        return await this.repository.findAll()
    }
    async findById(id: number): Promise<UserPark> {
        return await this.repository.findOne<UserPark>({ where: { id: id } })
    }

    async update(id: number, userParkEntity: UserPark): Promise<UserPark> {
        const updatedUserParkId = await this.repository.update<UserPark>(
            {
                userId: userParkEntity.userId,
                parkId: userParkEntity.parkId,
            },
            {
                where: {
                    id: id
                }
            }
        )

        return await this.findById(id)
    }
    async remove(id: number): Promise<UserPark> {
        const foundUserPark = await this.findById(id)
        await this.repository.destroy<UserPark>({ where: { id: id } })
        return foundUserPark
    }
}