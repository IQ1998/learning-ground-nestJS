import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Department, { DEPARTMENT_STATUS } from './department.entity';
import { CreateDepartmentDto } from './dtos/create-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    // Tell the DI system to know what to inject here
    // The generic is not enough
    @InjectRepository(Department) private departRepo: Repository<Department>,
  ) {}

  async createDepartment(payload: CreateDepartmentDto): Promise<Department> {
    const toBeCreatedDepartment = await this.departRepo.create({
      idCode: payload.idCode,
      name: payload.name,
      email: payload.email || null,
      leaderEmails: payload.leaderEmails,
      status: payload.status || DEPARTMENT_STATUS.ACTIVE,
    });

    const created = await this.departRepo.save(toBeCreatedDepartment);

    return created;
  }
}
