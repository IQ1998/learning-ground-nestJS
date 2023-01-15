import { Entity, Column, OneToMany } from 'typeorm';
import Base from '../non-modules/helper/base.entity';
import Account from '../account/account.entity';

@Entity('ROLE')
export default class Role extends Base {
  @Column({
    type: 'nvarchar',
    unique: true,
  })
  code: string;

  @Column('nvarchar')
  desc: string;

  @OneToMany(() => Account, (memberAccount) => memberAccount.role)
  accounts: Account[];

  // Can be extended further with seperate permission, but this will do for now
}
