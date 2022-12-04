import { Expose } from 'class-transformer';
import { ACCOUNT_STATUS } from '../account.constant';

export class OutgoingAccountDto {
  @Expose()
  id: string;
  @Expose()
  userName: string;
  @Expose()
  ldapID: string;
  @Expose()
  password: string;
  @Expose()
  fullName: string;
  @Expose()
  fromDepartmentId: string;
  @Expose()
  avatar: string;
  @Expose()
  roleId: string;
  @Expose()
  status: ACCOUNT_STATUS;
  @Expose()
  createdAt: Date;
  // @Expose()
  updatedAt: Date;
  // createdBy
  // updatedBy
}
