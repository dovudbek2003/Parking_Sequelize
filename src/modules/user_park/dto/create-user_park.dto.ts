import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateUserParkDto {
    @ApiProperty({ type: Number })
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ type: Number })
    @IsInt()
    @IsNotEmpty()
    parkId: number;
}
