import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IlistQueryOptions } from './regis-period.constant';
import RegisPeriod from './regis-period.entity';
import { CreateRegisPeriodDto } from './dtos/create-regis-period.dto';
import { catchFailedQueryClass } from '../non-modules/decorators/catch-query-failed.decorator';
import { UpdateRegisPeriodDto } from './dtos/update-regis-period.dto';
import updater from '../non-modules/helper/updater';

@Injectable()
@catchFailedQueryClass(__filename)
export class RegisPeriodService {
  constructor(
    // Tell the DI system to know what to inject here
    // The generic is not enough
    @InjectRepository(RegisPeriod)
    private regisPeriodRepo: Repository<RegisPeriod>,
  ) {}

  async createRegisPeriod(payload: CreateRegisPeriodDto): Promise<RegisPeriod> {
    const toBeCreatedRegisPeriod = await this.regisPeriodRepo.create({
      name: payload.name,
      year: payload.year,
      registerEndDate: payload.registerEndDate,
      expenseListId: payload.expenseListId,
    });

    const created = await this.regisPeriodRepo.save(toBeCreatedRegisPeriod);

    return created;
  }

  async findOne(id: string): Promise<RegisPeriod> {
    return this.regisPeriodRepo.findOne({
      where: {
        id,
      },
    });
  }

  // @catchFailedQuery(__filename)
  async findMany(
    queryOptions: IlistQueryOptions,
  ): Promise<{ count: number; data: RegisPeriod[] }> {
    const { skip = 0, take = 20, searchTerm = '', year } = queryOptions;

    const list = await this.regisPeriodRepo
      .createQueryBuilder('REGIS_PERIOD')
      .offset(skip)
      .limit(take)
      .orderBy('REGIS_PERIOD.createdAt', 'DESC')
      .where(
        // eslint-disable-next-line max-len
        'UPPER(REGIS_PERIOD.name) like UPPER(:name)',
        {
          name: `%${searchTerm || ''}%`,
        },
      )
      .andWhere(
        `REGIS_PERIOD.year ${year === undefined ? 'IS NOT NULL' : '= :year'}`,
        {
          year,
        },
      )
      .getManyAndCount();

    return {
      count: list[1],
      data: list[0],
    };
  }

  async patchRegisPeriod(
    id: string,
    updatePayload: UpdateRegisPeriodDto,
  ): Promise<RegisPeriod | null> {
    const toBeUpdated = await this.findOne(id);
    if (!toBeUpdated) {
      return toBeUpdated;
    }
    updater.updatePatchStyle(toBeUpdated, updatePayload);
    const saved = await this.regisPeriodRepo.save(toBeUpdated);
    return saved;
  }
}
