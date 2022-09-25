import Base from 'src/helper/base.entity';
import { Entity, Column } from 'typeorm';

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
}
