import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCarDto {
    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    model: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    index: string;

    @ApiProperty({ type: Number })
    @IsInt()
    @IsNotEmpty()
    userId: number;
}
