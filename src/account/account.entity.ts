import Department from '../department/department.entity';
import Base from '../non-modules/helper/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ACCOUNT_STATUS } from './account.constant';
import Role from '../role/role.entity';

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
  // If null it means this account does not belong to any department
  // Maybe it is because that department has been deleted
  @Column({
    type: 'nvarchar',
    default: null,
    nullable: true,
  })
  fromDepartmentId: string;

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

  @ManyToOne(() => Department, (department) => department.accounts, {
    onDelete: 'SET NULL',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'fromDepartmentId' })
  fromDepartment: Department;

  @ManyToOne(() => Role, (role) => role.accounts)
  role: Role;
}
