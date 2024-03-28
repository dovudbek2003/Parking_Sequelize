import { PartialType } from '@nestjs/swagger';
import { CreateUserParkDto } from './create-user_park.dto';

export class UpdateUserParkDto extends PartialType(CreateUserParkDto) {}
