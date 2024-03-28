import { Test, TestingModule } from '@nestjs/testing';
import { UserParkService } from './user_park.service';

describe('UserParkService', () => {
  let service: UserParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserParkService],
    }).compile();

    service = module.get<UserParkService>(UserParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
