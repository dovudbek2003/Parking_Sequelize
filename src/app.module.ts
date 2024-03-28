import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './common/config';
import { UserModule } from './modules/user/user.module';
import { CarModule } from './modules/car/car.module';
import { ParkModule } from './modules/park/park.module';
import { UserParkModule } from './modules/user_park/user_park.module';
import { User } from './modules/user/entities/user.entity';
import { Car } from './modules/car/entities/car.entity';
import { Park } from './modules/park/entities/park.entity';
import { UserPark } from './modules/user_park/entities/user_park.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: config.dbHost,
      port: config.dbPort,
      username: config.dbUserName,
      password: config.dbPassword,
      database: config.dbName,
      models: [User, Car, Park, UserPark],
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    CarModule,
    ParkModule,
    UserParkModule,
  ],
})
export class AppModule { }
