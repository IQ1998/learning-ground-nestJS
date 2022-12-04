import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import Base from '../non-modules/helper/base.entity';
import DepartmentRegis from '../department-regis/department-regis.entity';

@Entity('REGIS_PERIOD')
export default class RegisPeriod extends Base {
  @Column({
    type: 'nvarchar',
  })
  name: string;

  @Column({
    type: 'smallint',
    unique: true,
  })
  year: number;

  @Column({
    type: 'date',
  })
  registerEndDate: Date;

  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  expenseListId: string;

  @OneToMany(
    () => DepartmentRegis,
    (departmentRegis) => departmentRegis.regisPeriod,
  )
  departmentRegiss: DepartmentRegis[];
}
