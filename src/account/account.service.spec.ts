import { Test, TestingModule } from '@nestjs/testing';
import * as argon2 from 'argon2';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MockType,
  repositoryMockFactory,
} from '../non-modules/helper/repoMockFactory';
import { AccountService } from './account.service';
import Account from './account.entity';
import { ACCOUNT_STATUS, LOGIN_RESULT } from './account.constant';

describe('AccountService', () => {
  let service: AccountService;
  let accountRepoMock: MockType<Repository<Account>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(Account),
          useFactory: repositoryMockFactory(['findOne']),
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    accountRepoMock = module.get(getRepositoryToken(Account));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('AccountService should handle login cases appropriately', () => {
    it(`return ${LOGIN_RESULT.SUCCESS} when account password is correct`, async () => {
      const mockValue = {
        userName: 'AN_DEP_TRAI',
        password: 'AN_DEP_TRAI',
        id: 'AN_DEP_TRAI_ID',
        ldapID: 'AN_DEP_TRAI_LDAP',
        fullName: 'AN_DEP_TRAI_NAME',
        roleId: 'AN_DEP_TRAI_ROLEID',
        fromDepartment: {
          id: 'ADT_DEPARTMENT_ID',
          idCode: 'ADT_DEPARTMENT_IDCODE',
          name: 'ADT_DEPARTMENT_NAME',
        },
      };
      accountRepoMock.findOne.mockReturnValue({
        userName: mockValue.userName,
        password: mockValue.password,
        id: mockValue.id,
        ldapID: mockValue.ldapID,
        fullName: mockValue.fullName,
        roleId: mockValue.roleId,
        fromDepartment: {
          id: mockValue.fromDepartment.id,
          idCode: mockValue.fromDepartment.idCode,
          name: mockValue.fromDepartment.name,
        },
      });
      const dateNow = Date.now();
      jest.spyOn(Date, 'now').mockImplementation(() => dateNow);
      jest
        .spyOn(argon2, 'verify')
        .mockImplementation(() => Promise.resolve(true));
      const loginResult = await service.login({
        userName: 'AN_DEP_TRAI',
        password: 'AN_DEP_TRAI',
      });
      expect(loginResult.result).toEqual(LOGIN_RESULT.SUCCESS);
      expect(typeof loginResult.sessionInfo.key).toBe('string');
      expect(loginResult.sessionInfo.payload).toEqual({
        id: mockValue.id,
        userName: mockValue.userName,
        ldapId: mockValue.ldapID,
        fullName: mockValue.fullName,
        roleId: mockValue.roleId,
        fromDepartment: {
          id: mockValue.fromDepartment.id,
          idCode: mockValue.fromDepartment.idCode,
          name: mockValue.fromDepartment.name,
        },
        expiredAt: new Date(dateNow + 60000),
      });
    });

    it(`return ${LOGIN_RESULT.NOT_FOUND} when account is not found`, async () => {
      accountRepoMock.findOne.mockReturnValue(null);
      const loginResult = await service.login({
        userName: 'AN_DEP_TRAI',
        password: 'AN_DEP_TRAI',
      });
      expect(loginResult).toEqual({
        result: LOGIN_RESULT.NOT_FOUND,
        sessionInfo: null,
      });
      expect(accountRepoMock.findOne).toHaveBeenCalled();
    });

    it(`return ${LOGIN_RESULT.INACTIVE} when account is not active`, async () => {
      accountRepoMock.findOne.mockReturnValue({
        status: ACCOUNT_STATUS.INACTIVE,
      });
      const loginResult = await service.login({
        userName: 'AN_DEP_TRAI',
        password: 'AN_DEP_TRAI',
      });
      expect(loginResult).toEqual({
        result: LOGIN_RESULT.INACTIVE,
        sessionInfo: null,
      });
    });

    it(`return ${LOGIN_RESULT.WRONG_PASSWORD} when account password is wrong`, async () => {
      accountRepoMock.findOne.mockReturnValue({
        username: 'AN_DEP_TRAI',
        password:
          '$argon2id$v=19$m=16,t=2,p=1$c2Fkc2EyMzJAIyQjQA$sW02CBDKPJEjX3Rz09Ngxg',
      });
      const loginResult = await service.login({
        userName: 'AN_DEP_TRAI',
        password: 'AN_DEP_TRAI',
      });
      expect(loginResult).toEqual({
        result: LOGIN_RESULT.WRONG_PASSWORD,
        sessionInfo: null,
      });
    });
  });
});
