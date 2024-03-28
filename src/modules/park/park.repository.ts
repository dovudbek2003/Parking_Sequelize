import { InjectModel } from "@nestjs/sequelize";
import { Park } from "./entities/park.entity";
import { IParkRepository } from "./interfaces/park.repository";


export class ParkRepository implements IParkRepository {
    constructor(
        @InjectModel(Park)
        private readonly repository: typeof Park,
    ) { }


    async insert(parkEntity: Park): Promise<Park> {
        return await this.repository.create<Park>({
            name: parkEntity.name,
            capacity: parkEntity.capacity,
            price: parkEntity.price
        })
    }
    async findAll(): Promise<Park[]> {
        return await this.repository.findAll()
    }
    async findById(id: number): Promise<Park> {
        return await this.repository.findOne<Park>({ where: { id: id } })
    }

    async update(id: number, parkEntity: Park): Promise<Park> {
        const updatedParkId = await this.repository.update<Park>(
            {
                name: parkEntity.name,
                capacity: parkEntity.capacity,
                price: parkEntity.price
            },
            {
                where: {
                    id: id
                }
            }
        )

        return await this.findById(id)
    }
    async remove(id: number): Promise<Park> {
        const foundPark = await this.findById(id)
        await this.repository.destroy<Park>({ where: { id: id } })
        return foundPark
    }
}