import { Test, TestingModule } from '@nestjs/testing';
import { RegisPeriodController } from './regis-period.controller';

describe('RegisPeriodController', () => {
  let controller: RegisPeriodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisPeriodController],
    }).compile();

    controller = module.get<RegisPeriodController>(RegisPeriodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
