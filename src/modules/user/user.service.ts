import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserResData, IUserService } from './interfaces/user.service';
import { ResData } from 'src/lib/resData';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository';
import { UserAlreadyExist, UserNotFound } from './exception/user.exception';
import { hashPassword } from 'src/lib/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly repository: IUserRepository,
    private jwtService: JwtService
  ) { }


  async create(createUserDto: CreateUserDto): Promise<ResData<IUserResData>> {
    const foundUserByPhoneNumber = await this.findByPhoneNumber(createUserDto.phoneNumber)
    if (foundUserByPhoneNumber) {
      throw new UserAlreadyExist()
    }

    let newUser = new User()
    newUser = Object.assign(newUser, createUserDto)

    newUser.password = await hashPassword(newUser.password)
    const createdUser = await this.repository.insert(newUser)
    const token = await this.jwtService.signAsync({ id: createdUser.id })

    return new ResData<IUserResData>('create', 201, { user: createdUser, token })
  }

  async findAll(): Promise<ResData<User[]>> {
    const users = await this.repository.findAll()
    return new ResData<User[]>('get all', 200, users)
  }
  async findOne(id: number): Promise<ResData<User>> {
    const user = await this.repository.findById(id)
    if (!user) {
      throw new UserNotFound()
    }

    return new ResData<User>('get one', 200, user)
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    return await this.repository.findByPhoneNumber(phoneNumber)
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ResData<User>> {
    const { data: foundUser } = await this.findOne(id)
    const foundUserByPhoneNumber = await this.findByPhoneNumber(updateUserDto.phoneNumber)

    if (foundUserByPhoneNumber && foundUser.id !== foundUserByPhoneNumber.id) {
      throw new UserAlreadyExist()
    }

    const newUser = Object.assign(foundUser, updateUserDto)
    newUser.password = await hashPassword(newUser.password)
    const updatedUser = await this.repository.update(id, newUser)

    return new ResData<User>('update', 200, updatedUser)
  }
  async remove(id: number): Promise<ResData<User>> {
    await this.findOne(id)
    const deletedUser = await this.repository.remove(id)
    return new ResData<User>('delete', 200, deletedUser)
  }
}
