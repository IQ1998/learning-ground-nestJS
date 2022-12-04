import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { DEPARTMENT_REGIS_STATUS } from '../department-regis.constant';

export class CreateDepartmentRegisDto {
  @IsString()
  regisPeriodId: string;

  @IsOptional()
  @IsString()
  status: DEPARTMENT_REGIS_STATUS;

  @IsString()
  fromDepartmentId: string;

  @IsOptional()
  @IsString()
  notes: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @IsArray()
  expenses: Record<string, any>[];
}
