import { Test, TestingModule } from '@nestjs/testing';
import { OnlineClassService } from './online-class.service';

describe('OnlineClassService', () => {
  let service: OnlineClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnlineClassService],
    }).compile();

    service = module.get<OnlineClassService>(OnlineClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
