import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { DEPARTMENT_STATUS } from '../department.entity';

export class CreateDepartmentDto {
  @IsString()
  idCode: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string | undefined;

  @IsString({
    each: true,
  })
  @IsArray()
  leaderEmails: string[];

  @IsOptional()
  @IsEnum(DEPARTMENT_STATUS)
  status: DEPARTMENT_STATUS | undefined;
}
