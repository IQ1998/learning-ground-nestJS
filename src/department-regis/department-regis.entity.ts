import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import Base from '../non-modules/helper/base.entity';
import { DEPARTMENT_REGIS_STATUS } from './department-regis.constant';
import Department from '../department/department.entity';
import RegisPeriod from '../regis-period/regis-period.entity';

@Entity('DEPARTMENT_REGISTRATION')
export default class DepartmentRegis extends Base {
  @Column({
    type: 'nvarchar',
  })
  regisPeriodId: string;

  @Column({
    type: 'nvarchar',
    default: '',
  })
  name: string;

  // To see what statuses are available, see src/server/constants/bunchesOfStatus.ts
  @Column({
    type: 'nvarchar',
  })
  status: DEPARTMENT_REGIS_STATUS;

  @Column({
    type: 'nvarchar',
  })
  fromDepartmentId: string;

  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  notes: string | null;

  @Column({
    type: 'smallint',
    nullable: true,
  })
  year: number;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  expenses: Record<string, any>[];

  @ManyToOne(
    () => Department,
    (fromDepartment) => fromDepartment.departmentRegiss,
  )
  @JoinColumn({ name: 'fromDepartmentId' })
  fromDepartment: Department;

  @ManyToOne(() => RegisPeriod, (regisP) => regisP.departmentRegiss)
  @JoinColumn({ name: 'regisPeriodId' })
  regisPeriod: Department;
}
