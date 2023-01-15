import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { catchFailedQueryClass } from '../non-modules/decorators/catch-query-failed.decorator';
import { CreateRoleDto } from './dtos/create-role.dto';
import Role from './role.entity';

@Injectable()
@catchFailedQueryClass(__filename)
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRegisRepo: Repository<Role>,
  ) {}

  async createRole(payload: CreateRoleDto): Promise<Role> {
    const tobeCreated = await this.roleRegisRepo.create({
      ...payload,
    });

    const created = await this.roleRegisRepo.save(tobeCreated);

    return created;
  }

  async findMany(): Promise<{ count: number; data: Role[] }> {
    const listResult = await this.roleRegisRepo.findAndCount();
    return {
      count: listResult[1],
      data: listResult[0],
    };
  }

  async findOne(idOrCode: string): Promise<Role | null> {
    if (typeof idOrCode !== 'string') return null;
    const result = await this.roleRegisRepo.findOne({
      where: [{ id: idOrCode }, { code: idOrCode }],
    });
    return result;
  }
}
