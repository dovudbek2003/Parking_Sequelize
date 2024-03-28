import { Park } from "../entities/park.entity"

export interface IParkRepository {
    insert(parkEntity: Park): Promise<Park>
    findAll(): Promise<Array<Park>>
    findById(id: number): Promise<Park>
    update(id: number, parkEntity: Park): Promise<Park>
    remove(id: number): Promise<Park>
}