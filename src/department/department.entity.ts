import Base from '../non-modules/helper/base.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import DepartmentRegis from '../department-regis/department-regis.entity';
import Account from '../account/account.entity';

export enum DEPARTMENT_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('DEPARTMENT')
export default class Department extends Base {
  @Column({
    type: 'nvarchar',
    unique: true,
  })
  idCode: string;

  @Column('nvarchar')
  name: string;

  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  email: string;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  leaderEmails: string[];

  // 0 -> non active, 5 -> active
  @Column({
    type: 'nvarchar',
    default: DEPARTMENT_STATUS.ACTIVE,
  })
  status: string;

  @OneToMany(() => Account, (account) => account.fromDepartment)
  accounts: Account[];

  @OneToMany(
    () => DepartmentRegis,
    (departmentRegis) => departmentRegis.fromDepartment,
  )
  departmentRegiss: DepartmentRegis[];
}
