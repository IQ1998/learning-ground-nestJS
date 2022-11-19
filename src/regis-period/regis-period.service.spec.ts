import { Test, TestingModule } from '@nestjs/testing';
import { RegisPeriodService } from './regis-period.service';

describe('RegisPeriodService', () => {
  let service: RegisPeriodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisPeriodService],
    }).compile();

    service = module.get<RegisPeriodService>(RegisPeriodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
