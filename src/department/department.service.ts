import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IlistQueryOptions } from './department.constant';
import Department, { DEPARTMENT_STATUS } from './department.entity';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { catchFailedQueryClass } from '../non-modules/decorators/catch-query-failed.decorator';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

@Injectable()
@catchFailedQueryClass(__filename)
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

  async findOne(id: string): Promise<Department> {
    return this.departRepo.findOne({
      where: {
        id,
      },
    });
  }

  // @catchFailedQuery(__filename)
  async findMany(
    queryOptions: IlistQueryOptions,
  ): Promise<{ count: number; data: Department[] }> {
    const { skip, take, searchTerm, status } = queryOptions;

    const list = await this.departRepo
      .createQueryBuilder('DEPARTMENT')
      .offset(skip)
      .limit(take)
      .orderBy('DEPARTMENT.createdAt', 'DESC')
      .where(
        // eslint-disable-next-line max-len
        'UPPER(DEPARTMENT.name) like UPPER(:name) OR UPPER(DEPARTMENT.idCode) like UPPER(:name)',
        {
          name: `%${searchTerm || ''}%`,
        },
      )
      .andWhere(`DEPARTMENT.status ${status ? '= :status' : 'IS NOT NULL'}`, {
        status,
      })
      .getManyAndCount();

    return {
      count: list[1],
      data: list[0],
    };
  }

  async patchDepartment(
    id: string,
    updatePayload: UpdateDepartmentDto,
  ): Promise<Department | null> {
    const toBeUpdated = await this.findOne(id);
    if (!toBeUpdated) {
      return toBeUpdated;
    }
    toBeUpdated.idCode = updatePayload.idCode || toBeUpdated.idCode;
    toBeUpdated.name = updatePayload.name || toBeUpdated.name;
    toBeUpdated.email = updatePayload.email || toBeUpdated.email;
    toBeUpdated.leaderEmails =
      updatePayload.leaderEmails || toBeUpdated.leaderEmails;
    toBeUpdated.status = updatePayload.status || toBeUpdated.status;

    const saved = await this.departRepo.save(toBeUpdated);
    return saved;
  }
}
