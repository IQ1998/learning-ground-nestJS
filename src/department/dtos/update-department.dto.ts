import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { DEPARTMENT_STATUS } from '../department.entity';

// DTO must have a decorator or else GlobalPipe will strip the property
// because we are configuring whitelist = true
export class UpdateDepartmentDto {
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
