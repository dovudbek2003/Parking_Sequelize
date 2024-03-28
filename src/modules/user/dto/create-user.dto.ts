import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @ApiProperty({ type: String })
    @IsInt()
    @IsNotEmpty()
    password: string

    @ApiProperty({ type: Number })
    @IsInt()
    @IsNotEmpty()
    balance: number
}
