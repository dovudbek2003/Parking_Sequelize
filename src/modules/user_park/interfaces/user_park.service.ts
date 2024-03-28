import { ResData } from "src/lib/resData"
import { UserPark } from "../entities/user_park.entity"
import { CreateUserParkDto } from "../dto/create-user_park.dto"
import { UpdateUserParkDto } from "../dto/update-user_park.dto"

export interface IUserParkService {
    create(createUserParkDto: CreateUserParkDto): Promise<ResData<UserPark>>
    findAll(): Promise<ResData<Array<UserPark>>>
    findOne(id: number): Promise<ResData<UserPark>>
    update(id: number, updateUserParkDto: UpdateUserParkDto): Promise<ResData<UserPark>>
    remove(id: number): Promise<ResData<UserPark>>
}