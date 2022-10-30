import Base from 'src/non-modules/helper/base.entity';
import { Entity, Column } from 'typeorm';
import { ACCOUNT_STATUS } from './account.constant';

@Entity('ACCOUNT')
export default class Account extends Base {
  @Column('nvarchar')
  userName: string;

  @Column({
    type: 'nvarchar',
    default: null,
    nullable: true,
  })
  ldapID: string;

  @Column('nvarchar')
  password: string;

  @Column('nvarchar')
  fullName: string;

  // The unit to which thiz account belongs
  @Column({
    type: 'nvarchar',
    default: null,
    nullable: true,
  })
  fromUnitId: string;

  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'nvarchar',
    nullable: true,
    default: null,
  })
  roleId: string;

  @Column({
    type: 'nvarchar',
    default: ACCOUNT_STATUS.ACTIVE,
  })
  status: string;
}
