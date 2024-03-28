import { User } from "../entities/user.entity";

export interface IUserRepository {
    insert(userEntity: User): Promise<User>
    findAll(): Promise<Array<User>>
    findById(id: number): Promise<User>
    findByPhoneNumber(phoneNumber: string): Promise<User>
    update(id: number, userEntity: User): Promise<User>
    remove(id: number): Promise<User>
}