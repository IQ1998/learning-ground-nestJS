import Department from 'src/department/department.entity';
import Base from 'src/non-modules/helper/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
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
}
