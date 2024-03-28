import { InjectModel } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";
import { IUserRepository } from "./interfaces/user.repository";
import { where } from "sequelize";

export class UserRepository implements IUserRepository {
    constructor(
        @InjectModel(User)
        private readonly repository: typeof User,
    ) { }


    async insert(userEntity: User): Promise<User> {
        return await this.repository.create<User>({
            phoneNumber: userEntity.phoneNumber,
            password: userEntity.password,
            balance: userEntity.balance
        })
    }
    async findAll(): Promise<User[]> {
        return await this.repository.findAll()
    }
    async findById(id: number): Promise<User> {
        return await this.repository.findOne<User>({ where: { id: id } })
    }
    async findByPhoneNumber(phoneNumber: string): Promise<User> {
        return await this.repository.findOne<User>({ where: { phoneNumber: phoneNumber } })
    }
    async update(id: number, userEntity: User): Promise<User> {
        const updatedUserId = await this.repository.update<User>(
            {
                phoneNumber: userEntity.phoneNumber,
                password: userEntity.password,
                balance: userEntity.balance
            },
            {
                where: {
                    id: id
                }
            }
        )

        return await this.findById(id)
    }
    async remove(id: number): Promise<User> {
        const foundUser = await this.findById(id)
        await this.repository.destroy<User>({ where: { id: id } })
        return foundUser
    }
}