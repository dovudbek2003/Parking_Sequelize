import { Car } from "../entities/car.entity";

export interface ICarRepository {
    insert(carEntity: Car): Promise<Car>
    findAll(): Promise<Array<Car>>
    findById(id: number): Promise<Car>
    findByIndex(index: string): Promise<Car>
    update(id: number, carEntity: Car): Promise<Car>
    remove(id: number): Promise<Car>
}