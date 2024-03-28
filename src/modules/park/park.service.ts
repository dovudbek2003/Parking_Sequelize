import { Inject, Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { IParkService } from './interfaces/park.service';
import { ResData } from 'src/lib/resData';
import { Park } from './entities/park.entity';
import { IParkRepository } from './interfaces/park.repository';
import { ParkNotFound } from './exception/park.exception';

@Injectable()
export class ParkService implements IParkService {
  constructor(@Inject('IParkRepository') private readonly repository: IParkRepository) { }

  async create(createParkDto: CreateParkDto): Promise<ResData<Park>> {
    let newPark = new Park()
    newPark = Object.assign(newPark, createParkDto)

    const createdPark = await this.repository.insert(newPark)

    return new ResData<Park>('create', 201, createdPark)
  }
  async findAll(): Promise<ResData<Park[]>> {
    const parks = await this.repository.findAll()
    return new ResData<Park[]>('get all', 200, parks)
  }
  async findOne(id: number): Promise<ResData<Park>> {
    const park = await this.repository.findById(id)
    if (!park) {
      throw new ParkNotFound()
    }

    return new ResData<Park>('get one', 200, park)
  }
  async update(id: number, updateParkDto: UpdateParkDto): Promise<ResData<Park>> {
    const { data: foundPark } = await this.findOne(id)
    const newPark = Object.assign(foundPark, updateParkDto)

    const updatedPark = await this.repository.update(id, newPark)

    return new ResData<Park>('update', 200, updatedPark)
  }
  async remove(id: number): Promise<ResData<Park>> {
    await this.findOne(id)
    const deletedPark = await this.repository.remove(id)

    return new ResData<Park>('delete', 200, deletedPark)
  }

}
