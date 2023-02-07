import { Test, TestingModule } from '@nestjs/testing';
import { OnlineClassController } from './online-class.controller';
import { OnlineClassService } from './online-class.service';

describe('OnlineClassController', () => {
  let controller: OnlineClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnlineClassController],
      providers: [OnlineClassService],
    }).compile();

    controller = module.get<OnlineClassController>(OnlineClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
