import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DepartmentService } from './department.service';
import Department, { DEPARTMENT_STATUS } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import {
  MockType,
  repositoryMockFactory,
} from '../non-modules/helper/repoMockFactory';

// TODO, research why this work --> DONE
// https://stackoverflow.com/questions/55366037/inject-typeorm-repository-into-nestjs-service-for-mock-data-testing
describe.only('DepartmentService', () => {
  let service: DepartmentService;
  let departmentRepoMock: MockType<Repository<Department>>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentService,
        {
          provide: getRepositoryToken(Department),
          useFactory: repositoryMockFactory(['save', 'create']),
        },
      ],
    }).compile();

    service = module.get<DepartmentService>(DepartmentService);
    departmentRepoMock = module.get(getRepositoryToken(Department));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and return a department - createDepartment()', async () => {
    const payload1: CreateDepartmentDto = {
      idCode: 'TEST_123',
      name: 'TEST_DEPARTMENT_123',
      email: 'test_department@test.com',
      leaderEmails: ['test_leader1@test.com', 'test_leader1@test.com'],
      status: DEPARTMENT_STATUS.INACTIVE,
    };

    departmentRepoMock.create.mockReturnValue({
      idCode: 'TEST_123',
      name: 'TEST_DEPARTMENT_123',
      email: 'test_department@test.com',
      leaderEmails: ['test_leader1@test.com', 'test_leader1@test.com'],
      status: DEPARTMENT_STATUS.INACTIVE,
    });

    departmentRepoMock.save.mockReturnValue({
      idCode: 'TEST_123',
      name: 'TEST_DEPARTMENT_123',
      email: 'test_department@test.com',
      leaderEmails: ['test_leader1@test.com', 'test_leader1@test.com'],
      status: DEPARTMENT_STATUS.INACTIVE,
    });

    const testResult1 = await service.createDepartment(payload1);
    expect(testResult1).toEqual(payload1);
    expect(departmentRepoMock.create).toHaveBeenCalled();
    expect(departmentRepoMock.save).toHaveBeenCalled();
  });
});
