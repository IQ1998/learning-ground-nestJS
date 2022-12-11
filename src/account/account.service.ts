import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import updater from '../non-modules/helper/updater';
import { Repository } from 'typeorm';
import Account from './account.entity';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccounttDto } from './dtos/update-account.dto';
import {
  ACCOUNT_STATUS,
  IlistQueryOptions,
  ISessionPayload,
  LOGIN_RESULT,
} from './account.constant';
import { catchFailedQueryClass } from '../non-modules/decorators/catch-query-failed.decorator';
import { LoginDto } from './dtos/login.dto';
import appConfigs from '../non-modules/helper/configs';

@Injectable()
@catchFailedQueryClass(__filename)
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
  ) {}

  private async hashPassword(toBeHashed: string): Promise<string> {
    const hashed = await argon2.hash(toBeHashed, {
      hashLength: 64,
      timeCost: 2,
    });
    return hashed;
  }

  async createAcc(payload: CreateAccountDto): Promise<Account> {
    const hashedPassword = await this.hashPassword(payload.password);
    const toBeCreatedAccount = await this.accountRepo.create({
      userName: payload.userName,
      ldapID: payload.ldapID,
      password: hashedPassword,
      fullName: payload.fullName,
      fromDepartmentId: payload.fromDepartmentId,
      avatar: payload.avatar,
      roleId: payload.roleId,
      status: payload.status || ACCOUNT_STATUS.ACTIVE,
    });

    const created = await this.accountRepo.save(toBeCreatedAccount);

    return created;
  }

  async findOne(id: string): Promise<Account> {
    return this.accountRepo.findOne({
      where: {
        id,
      },
      relations: ['fromDepartment'],
    });
  }

  // @catchFailedQuery(__filename)
  async findMany(
    queryOptions: IlistQueryOptions,
  ): Promise<{ count: number; data: Account[] }> {
    const { skip, take, searchTerm, status } = queryOptions;

    let list = this.accountRepo
      .createQueryBuilder('ACCOUNT')
      .offset(skip)
      .limit(take)
      .orderBy('ACCOUNT.createdAt', 'DESC')
      .where(`ACCOUNT.status ${status ? '= :status' : 'IS NOT NULL'}`, {
        status,
      });

    if (typeof searchTerm === 'string' && searchTerm !== '') {
      list = list.andWhere(
        // eslint-disable-next-line max-len
        'UPPER(ACCOUNT.userName) like UPPER(:name) OR UPPER(ACCOUNT.ldapID) like UPPER(:name) OR UPPER(ACCOUNT.fullName) like UPPER(:name)',
        {
          name: `%${searchTerm || ''}%`,
        },
      );
    }

    const result = await list.getManyAndCount();

    return {
      count: result[1],
      data: result[0],
    };
  }

  async patchAccount(
    id: string,
    updatePayload: UpdateAccounttDto,
  ): Promise<Account | null> {
    const toBeUpdated = await this.findOne(id);
    if (!toBeUpdated) {
      return toBeUpdated;
    }
    updater.updatePatchStyle(toBeUpdated, updatePayload);
    const saved = await this.accountRepo.save(toBeUpdated);
    return saved;
  }

  async login(payload: LoginDto): Promise<{
    result: LOGIN_RESULT;
    sessionInfo: { key: string; payload: ISessionPayload } | null;
  }> {
    const thisUser = await this.accountRepo.findOne({
      where: {
        userName: payload.userName,
      },
      relations: ['fromDepartment'],
    });
    if (!thisUser) {
      return { result: LOGIN_RESULT.NOT_FOUND, sessionInfo: null };
    }
    if (thisUser.status === ACCOUNT_STATUS.INACTIVE) {
      return { result: LOGIN_RESULT.INACTIVE, sessionInfo: null };
    }

    const isCorrectPassword = await argon2.verify(
      thisUser.password,
      payload.password,
    );

    if (!isCorrectPassword) {
      return { result: LOGIN_RESULT.WRONG_PASSWORD, sessionInfo: null };
    }

    const sessionPayload: ISessionPayload = {
      id: thisUser.id,
      userName: thisUser.userName,
      ldapId: thisUser.ldapID,
      fullName: thisUser.fullName,
      roleId: thisUser.roleId,
      fromDepartment: {
        id: thisUser.fromDepartmentId,
        idCode: thisUser.fromDepartmentId ? thisUser.fromDepartment.idCode : '',
        name: thisUser.fromDepartmentId ? thisUser.fromDepartment.name : '',
      },
      expiredAt: new Date(Date.now() + appConfigs.sessionExpire),
    };

    const sessionKey = (
      await argon2.hash(thisUser.id, {
        hashLength: 16,
        timeCost: 2,
        raw: true,
      })
    ).toString('base64');

    return {
      result: LOGIN_RESULT.SUCCESS,
      sessionInfo: {
        key: sessionKey,
        payload: sessionPayload,
      },
    };
  }
}
