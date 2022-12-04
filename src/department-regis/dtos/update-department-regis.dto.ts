import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { DEPARTMENT_REGIS_STATUS } from '../department-regis.constant';

// TODO: Finish Regis-period and Department-Regis
export class UpdateDepartmentRegisDto {
  @IsOptional()
  @IsString()
  regisPeriodId: string;

  @IsOptional()
  @IsString()
  status: DEPARTMENT_REGIS_STATUS;

  @IsOptional()
  @IsString()
  fromDepartmentId: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  notes: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsArray()
  expenses: Record<string, any>[];
}
