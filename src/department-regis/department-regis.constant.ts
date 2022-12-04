export interface IlistQueryOptions {
  skip?: number;
  take?: number;
  searchTerm?: string;
  status?: DEPARTMENT_REGIS_STATUS;
  year?: number;
}

export enum DEPARTMENT_REGIS_STATUS {
  // Dang lam, chua nop
  STILL_DOING = 'STILL_DOING',
  // Nop
  WAITING_RESULT = 'WAITING_RESULT',
  // YCBS
  REQUESTING_UPDATE = 'REQUESTING_UPDATE',
  // Verified
  VERIFIED = 'VERIFIED',
  // Denied
  DENIED = 'DENIED',
}
