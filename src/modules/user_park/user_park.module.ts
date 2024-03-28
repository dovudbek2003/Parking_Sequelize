import { Module } from '@nestjs/common';
import { UserParkService } from './user_park.service';
import { UserParkController } from './user_park.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserPark } from './entities/user_park.entity';
import { UserParkRepository } from './user_park.repository';
import { UserModule } from '../user/user.module';
import { ParkModule } from '../park/park.module';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { ParkService } from '../park/park.service';
import { ParkRepository } from '../park/park.repository';

@Module({
  imports: [SequelizeModule.forFeature([UserPark]), UserModule, ParkModule],
  controllers: [UserParkController],
  providers: [
    { provide: 'IUserParkService', useClass: UserParkService },
    { provide: 'IUserParkRepository', useClass: UserParkRepository },
    // { provide: 'IUserService', useClass: UserService },
    // { provide: 'IUserRepository', useClass: UserRepository },
    // { provide: 'IParkService', useClass: ParkService },
    // { provide: 'IParkRepository', useClass: ParkRepository }
  ],
})
export class UserParkModule { }
