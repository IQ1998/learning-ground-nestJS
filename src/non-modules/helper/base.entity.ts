import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// @Entity('QT_EXPENSE_LIST')
export default class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  createdBy: string;

  @Column({
    nullable: true,
    type: 'nvarchar',
  })
  updatedBy: string;
}
