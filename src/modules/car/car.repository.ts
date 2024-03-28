import { InjectModel } from "@nestjs/sequelize";
import { ICarRepository } from "./interfaces/car.repository";
import { where } from "sequelize";
import { Car } from "./entities/car.entity";

export class CarRepository implements ICarRepository {
    constructor(
        @InjectModel(Car)
        private readonly repository: typeof Car,
    ) { }


    async insert(carEntity: Car): Promise<Car> {
        return await this.repository.create<Car>({
            model: carEntity.model,
            index: carEntity.index,
            userId: carEntity.userId
        })
    }
    async findAll(): Promise<Car[]> {
        return await this.repository.findAll()
    }
    async findById(id: number): Promise<Car> {
        return await this.repository.findOne<Car>({ where: { id: id } })
    }
    async findByIndex(index: string): Promise<Car> {
        return await this.repository.findOne<Car>({ where: { index: index } })
    }
    async update(id: number, carEntity: Car): Promise<Car> {
        const updatedCarId = await this.repository.update<Car>(
            {
                model: carEntity.model,
                index: carEntity.index,
                userId: carEntity.userId
            },
            {
                where: {
                    id: id
                }
            }
        )

        return await this.findById(id)
    }
    async remove(id: number): Promise<Car> {
        const foundCar = await this.findById(id)
        await this.repository.destroy<Car>({ where: { id: id } })
        return foundCar
    }
}