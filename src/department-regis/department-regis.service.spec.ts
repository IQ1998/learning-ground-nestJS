import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentRegisService } from './department-regis.service';

describe('DepartmentRegisService', () => {
  let service: DepartmentRegisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentRegisService],
    }).compile();

    service = module.get<DepartmentRegisService>(DepartmentRegisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
