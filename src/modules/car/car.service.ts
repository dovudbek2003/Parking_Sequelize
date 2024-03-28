import { Inject, Injectable, Res } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ICarService } from './interfaces/car.service';
import { ResData } from 'src/lib/resData';
import { Car } from './entities/car.entity';
import { ICarRepository } from './interfaces/car.repository';
import { CarAlreadyExist, CarNotFound } from './exception/car.exception';

@Injectable()
export class CarService implements ICarService {
  constructor(@Inject('ICarRepository') private readonly repository: ICarRepository) { }
  async create(createCarDto: CreateCarDto): Promise<ResData<Car>> {
    const foundCar = await this.findByIndex(createCarDto.index)
    if (foundCar) {
      throw new CarAlreadyExist()
    }

    let newCar = new Car()
    newCar = Object.assign(newCar, createCarDto)

    const createdCar = await this.repository.insert(newCar)
    return new ResData<Car>('create', 201, createdCar)
  }
  async findAll(): Promise<ResData<Car[]>> {
    const cars = await this.repository.findAll()
    return new ResData<Car[]>('get all', 200, cars)
  }
  async findOne(id: number): Promise<ResData<Car>> {
    const car = await this.repository.findById(id)
    if (!car) {
      throw new CarNotFound()
    }

    return new ResData<Car>('get one', 200, car)
  }
  async findByIndex(index: string): Promise<Car> {
    return await this.repository.findByIndex(index)
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<ResData<Car>> {
    const { data: foundCar } = await this.findOne(id)

    if (updateCarDto.index) {
      const foundCarByIndex = await this.findByIndex(updateCarDto.index)
      if (foundCarByIndex && foundCarByIndex.id !== foundCar.id) {
        throw new CarAlreadyExist()
      }
    }

    const newCar = Object.assign(foundCar, updateCarDto)
    const updatedCar = await this.repository.update(id, newCar)

    return new ResData<Car>('update', 200, updatedCar)
  }
  async remove(id: number): Promise<ResData<Car>> {
    await this.findOne(id)
    const deletedCar = await this.repository.remove(id)

    return new ResData<Car>('delete', 200, deletedCar)
  }
}
