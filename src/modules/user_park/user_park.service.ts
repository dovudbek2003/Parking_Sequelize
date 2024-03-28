import { Inject, Injectable } from '@nestjs/common';
import { CreateUserParkDto } from './dto/create-user_park.dto';
import { UpdateUserParkDto } from './dto/update-user_park.dto';
import { IUserParkService } from './interfaces/user_park.service';
import { IUserParkRepository } from './interfaces/user_park.repository';
import { ResData } from 'src/lib/resData';
import { UserPark } from './entities/user_park.entity';
import { UserParkNotFound } from './exception/user_park.exception';

@Injectable()
export class UserParkService implements IUserParkService {
  constructor(@Inject('IUserParkRepository') private readonly repository: IUserParkRepository) { }

  // CREATE
  async create(createUserParkDto: CreateUserParkDto): Promise<ResData<UserPark>> {
    let newUserPark = new UserPark()
    newUserPark = Object.assign(newUserPark, createUserParkDto)

    const createdUserPark = await this.repository.insert(newUserPark)

    return new ResData<UserPark>('create', 201, createdUserPark)
  }

  // READE
  async findAll(): Promise<ResData<UserPark[]>> {
    const userParks = await this.repository.findAll()
    return new ResData<UserPark[]>('get all', 200, userParks)
  }
  async findOne(id: number): Promise<ResData<UserPark>> {
    const userPark = await this.repository.findById(id)
    if (!userPark) {
      throw new UserParkNotFound()
    }

    return new ResData<UserPark>('get one', 200, userPark)
  }

  // UPDATE
  async update(id: number, updateUserParkDto: UpdateUserParkDto): Promise<ResData<UserPark>> {
    const { data: foundUserPark } = await this.findOne(id)
    const newUserPark = Object.assign(foundUserPark, updateUserParkDto)

    const updatedUserPark = await this.repository.update(id, newUserPark)
    return new ResData<UserPark>('update', 200, updatedUserPark)
  }

  // DELETE
  async remove(id: number): Promise<ResData<UserPark>> {
    await this.findOne(id)
    const deletedUserPark = await this.repository.remove(id)

    return new ResData<UserPark>('delete', 200, deletedUserPark)
  }
}
