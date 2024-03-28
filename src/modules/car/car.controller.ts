import { Controller, Get, Post, Body, Put, Param, Delete, Inject } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ICarService } from './interfaces/car.service';
import { CarService } from './car.service';
import { IUserService } from '../user/interfaces/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cars')
@Controller('car')
export class CarController {
  constructor(
    @Inject('ICarService') private readonly carService: ICarService,
    @Inject('IUserService') private readonly userService: IUserService
  ) { }

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    await this.userService.findOne(createCarDto.userId)
    return this.carService.create(createCarDto);
  }

  @Get()
  async findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    await this.userService.findOne(updateCarDto.userId)
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
