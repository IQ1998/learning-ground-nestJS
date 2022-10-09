import { DEPARTMENT_STATUS } from '../department.entity';

export class UpdateDepartmentDto {
  idCode: string;
  name: string;
  email: string;
  leaderEmails: string[];
  status: DEPARTMENT_STATUS;
}
