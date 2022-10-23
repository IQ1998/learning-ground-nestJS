import { Expose } from 'class-transformer';
import { DEPARTMENT_STATUS } from '../department.entity';

export class OutgoingDepartmentDto {
  @Expose()
  id: string;
  @Expose()
  idCode: string;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  leaderEmails: string[];
  @Expose()
  status: DEPARTMENT_STATUS;
  @Expose()
  createdAt: Date;
  // @Expose()
  updatedAt: Date;
  // createdBy
  // updatedBy
}
