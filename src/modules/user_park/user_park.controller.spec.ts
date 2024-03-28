import { Test, TestingModule } from '@nestjs/testing';
import { UserParkController } from './user_park.controller';
import { UserParkService } from './user_park.service';

describe('UserParkController', () => {
  let controller: UserParkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserParkController],
      providers: [UserParkService],
    }).compile();

    controller = module.get<UserParkController>(UserParkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
