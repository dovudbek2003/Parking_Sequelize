import { UserPark } from "../entities/user_park.entity"

export interface IUserParkRepository {
    insert(userParkEntity: UserPark): Promise<UserPark>
    findAll(): Promise<Array<UserPark>>
    findById(id: number): Promise<UserPark>
    update(id: number, userParkEntity: UserPark): Promise<UserPark>
    remove(id: number): Promise<UserPark>
}