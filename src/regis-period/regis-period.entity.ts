import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import Base from '../non-modules/helper/base.entity';

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
}
