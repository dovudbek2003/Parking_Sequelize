import { Controller, Get, Post, Body, Put, Param, Delete, Inject } from '@nestjs/common';
import { CreateUserParkDto } from './dto/create-user_park.dto';
import { UpdateUserParkDto } from './dto/update-user_park.dto';
import { IUserParkService } from './interfaces/user_park.service';
import { IUserService } from '../user/interfaces/user.service';
import { IParkService } from '../park/interfaces/park.service';
import { ApiTags } from '@nestjs/swagger';
import { UserBadRequest } from './exception/user_park.exception';

@ApiTags('user_parks')
@Controller('user-park')
export class UserParkController {
  constructor(
    @Inject('IUserParkService') private readonly userParkService: IUserParkService,
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('IParkService') private readonly parkService: IParkService
  ) { }

  @Post()
  async create(@Body() createUserParkDto: CreateUserParkDto) {
    const { data: foundUser } = await this.userService.findOne(createUserParkDto.userId)
    const { data: foundPark } = await this.parkService.findOne(createUserParkDto.parkId)

    if (foundPark.capacity === 0 || foundPark.capacity < 0) {
      throw new UserBadRequest('bu parkda joy ma\'vjud emas')
    }

    foundPark.capacity = foundPark.capacity - 1

    const userBalance = foundUser.balance - foundPark.price
    if (userBalance < 0) {
      throw new UserBadRequest('sizning mablag\'ingiz yetarli emas')
    }

    foundUser.balance = foundUser.balance - foundPark.price
    await this.userService.update(foundUser.id, foundUser)
    await this.parkService.update(foundPark.id, foundPark)


    return this.userParkService.create(createUserParkDto);
  }

  @Get()
  async findAll() {
    return this.userParkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userParkService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserParkDto: UpdateUserParkDto) {
    const { data: foundUser } = await this.userService.findOne(updateUserParkDto.userId)
    const { data: foundPark } = await this.parkService.findOne(updateUserParkDto.parkId)

    if (foundPark.capacity === 0 || foundPark.capacity < 0) {
      throw new UserBadRequest('bu parkda joy ma\'vjud emas')
    }

    foundPark.capacity = foundPark.capacity - 1

    const userBalance = foundUser.balance - foundPark.price
    if (userBalance < 0) {
      throw new UserBadRequest('sizning mablag\'ingiz yetarli emas')
    }

    foundUser.balance = foundUser.balance - foundPark.price
    await this.userService.update(foundUser.id, foundUser)
    await this.parkService.update(foundPark.id, foundPark)

    return this.userParkService.update(+id, updateUserParkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userParkService.remove(+id);
  }
}
