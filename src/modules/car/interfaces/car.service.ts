import { ResData } from "src/lib/resData"
import { CreateCarDto } from "../dto/create-car.dto"
import { Car } from "../entities/car.entity"
import { UpdateCarDto } from "../dto/update-car.dto"

export interface ICarService {
    create(createCarDto: CreateCarDto): Promise<ResData<Car>>
    findAll(): Promise<ResData<Array<Car>>>
    findOne(id: number): Promise<ResData<Car>>
    findByIndex(index: string): Promise<Car | null>
    update(id: number, updateCarDto: UpdateCarDto): Promise<ResData<Car>>
    remove(id: number): Promise<ResData<Car>>
}