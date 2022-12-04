import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from 'src/department/department.module';
import Department from '../department/department.entity';
import { DepartmentRegisController } from './department-regis.controller';
import DepartmentRegis from './department-regis.entity';
import { DepartmentRegisService } from './department-regis.service';

@Module({
  controllers: [DepartmentRegisController],
  providers: [DepartmentRegisService],
  imports: [
    TypeOrmModule.forFeature([DepartmentRegis, Department]),
    DepartmentModule,
  ],
})
export class DepartmentRegisModule {}
