import { ResData } from "src/lib/resData"
import { CreateParkDto } from "../dto/create-park.dto"
import { Park } from "../entities/park.entity"
import { UpdateParkDto } from "../dto/update-park.dto"


export interface IParkService {
    create(createParkDto: CreateParkDto): Promise<ResData<Park>>
    findAll(): Promise<ResData<Array<Park>>>
    findOne(id: number): Promise<ResData<Park>>
    update(id: number, updateParkDto: UpdateParkDto): Promise<ResData<Park>>
    remove(id: number): Promise<ResData<Park>>
}