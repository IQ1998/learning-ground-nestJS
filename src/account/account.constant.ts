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
