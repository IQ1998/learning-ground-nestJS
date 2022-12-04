import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ACCOUNT_STATUS } from '../account.constant';

export class CreateAccountDto {
  @IsString()
  userName: string;

  @IsString()
  @IsOptional()
  ldapID: string;

  @IsString()
  password: string;

  @IsString()
  fullName: string;

  @IsString()
  fromDepartmentId: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  roleId: string;

  @IsOptional()
  @IsEnum(ACCOUNT_STATUS)
  status: ACCOUNT_STATUS;
}
