import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Department from '../department/department.entity';
import { Repository } from 'typeorm';
import { catchFailedQueryClass } from '../non-modules/decorators/catch-query-failed.decorator';
import updater from '../non-modules/helper/updater';
import { IlistQueryOptions } from './department-regis.constant';

import DepartmentRegis from './department-regis.entity';
import { CreateDepartmentRegisDto } from './dtos/create-department-regis.dto';
import { UpdateDepartmentRegisDto } from './dtos/update-department-regis.dto';
import { DepartmentService } from 'src/department/department.service';

@Injectable()
@catchFailedQueryClass(__filename)
export class DepartmentRegisService {
  constructor(
    // Tell the DI system to know what to inject here
    // The generic is not enough
    @InjectRepository(DepartmentRegis)
    private departmentRegisRepo: Repository<DepartmentRegis>,

    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,

    // @Inject(DepartmentService)
    private departmentService: DepartmentService,
  ) {}

  async createDepartmentRegis(
    payload: CreateDepartmentRegisDto,
  ): Promise<DepartmentRegis> {
    const thizDepartment = await this.departmentService.findOne(
      payload.fromDepartmentId,
    );
    if (!thizDepartment) {
      throw new Error(
        'Create department regis failed, department does not exist',
      );
    }
    const toBeCreatedDepartmentRegis = await this.departmentRegisRepo.create({
      regisPeriodId: payload.regisPeriodId,
      status: payload.status,
      fromDepartmentId: payload.fromDepartmentId,
      notes: payload.notes,
      year: payload.year,
      name: `Đăng ký chi phí năm ${payload.year} của đơn vị ${thizDepartment.name}`,
      expenses: payload.expenses,
    });

    const created = await this.departmentRegisRepo.save(
      toBeCreatedDepartmentRegis,
    );

    return created;
  }

  async findOne(id: string): Promise<DepartmentRegis> {
    return this.departmentRegisRepo.findOne({
      where: {
        id,
      },
    });
  }

  // @catchFailedQuery(__filename)
  async findMany(
    queryOptions: IlistQueryOptions,
  ): Promise<{ count: number; data: DepartmentRegis[] }> {
    const { skip = 0, take = 20, searchTerm = '', status, year } = queryOptions;

    let list = await this.departmentRegisRepo
      .createQueryBuilder('DEPARTMENT_REGISTRATION')
      .leftJoinAndSelect(
        'DEPARTMENT_REGISTRATION.fromDepartment',
        'fromDepartment',
      )
      .offset(skip)
      .limit(take)
      .orderBy('DEPARTMENT_REGISTRATION.createdAt', 'DESC')
      .where(
        // eslint-disable-next-line max-len
        'UPPER(DEPARTMENT_REGISTRATION.name) like UPPER(:name)',
        {
          name: `%${searchTerm || ''}%`,
        },
      );

    if (status) {
      list = list.andWhere('DEPARTMENT_REGISTRATION.status = :status', {
        status,
      });
    }
    if (year) {
      list = list.andWhere('DEPARTMENT_REGISTRATION.year = :year', {
        year,
      });
    }
    const listResult = await list.getManyAndCount();

    return {
      count: listResult[1],
      data: listResult[0],
    };
  }

  async findRegistered(
    queryOptions: IlistQueryOptions,
  ): Promise<{ count: number; data: Department[] }> {
    const registrations = await this.findMany({
      ...queryOptions,
      year: queryOptions.year || new Date().getFullYear(),
    });
    const departments = registrations.data.map((regis) => ({
      ...regis.fromDepartment,
    }));

    return {
      count: registrations.count,
      data: departments,
    };
  }

  async findNotRegistered(
    queryOptions: IlistQueryOptions,
  ): Promise<{ count: number; data: Department[] }> {
    const {
      skip = 0,
      take = 20,
      year = new Date().getFullYear(),
      status,
    } = queryOptions;
    console.log(
      '🚀 ~ file: department-regis.service.ts ~ line 133 ~ DepartmentRegisService ~ status',
      status,
    );

    const list = await this.departmentRepo
      .createQueryBuilder('DEPARTMENT')
      .leftJoinAndSelect(
        'DEPARTMENT.departmentRegiss',
        'departmentRegiss',
        // eslint-disable-next-line prettier/prettier
        `departmentRegiss.year = :year AND departmentRegiss.status ${!status ? 'IS NOT NULL' : '= :status'}`,
        {
          year,
          status,
        },
      )
      .orderBy('DEPARTMENT.createdAt', 'DESC')
      .where(
        // eslint-disable-next-line max-len
        'departmentRegiss.id IS NULL',
      )
      .getManyAndCount();

    const paginatedResult = list[0].slice(skip, skip + take);
    return {
      count: list[1],
      data: paginatedResult,
    };
  }

  async patchDepartmentRegis(
    id: string,
    updatePayload: UpdateDepartmentRegisDto,
  ): Promise<DepartmentRegis | null> {
    const toBeUpdated = await this.findOne(id);
    if (!toBeUpdated) {
      return toBeUpdated;
    }
    updater.updatePatchStyle(toBeUpdated, updatePayload);
    const saved = await this.departmentRegisRepo.save(toBeUpdated);
    return saved;
  }
}
