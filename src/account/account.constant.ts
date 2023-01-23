export interface IlistQueryOptions {
  skip?: number;
  take?: number;
  searchTerm?: string;
  status?: string;
}

export enum ACCOUNT_STATUS {
  ACTIVE = 'ACC_ACTIVE',
  INACTIVE = 'ACC_INACTIVE',
}

export enum LOGIN_RESULT {
  SUCCESS = 'SUCCESS',
  NOT_FOUND = 'NOT_FOUND',
  WRONG_PASSWORD = 'WRONG_PASSWORD',
  // LOCKED OR OTHER KIND OF NOT ALLOW TO LOGIN
  INACTIVE = 'NOT_ALLOWED_INACTIVE',
}

export interface ISessionPayload {
  id: string;
  userName: string;
  ldapId?: string | null;
  fullName: string;
  roleId?: string | null;
  fromDepartment: {
    id: string;
    idCode: string;
    name: string;
  };
  expiredAt: Date;
}
