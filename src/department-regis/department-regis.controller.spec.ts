import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentRegisController } from './department-regis.controller';

describe('DepartmentRegisController', () => {
  let controller: DepartmentRegisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentRegisController],
    }).compile();

    controller = module.get<DepartmentRegisController>(
      DepartmentRegisController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
