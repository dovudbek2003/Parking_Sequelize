import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './entities/car.entity';
import { CarRepository } from './car.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Car]), UserModule],
  controllers: [CarController],
  providers: [
    { provide: 'ICarService', useClass: CarService },
    { provide: 'ICarRepository', useClass: CarRepository }
  ],
})
export class CarModule { }
