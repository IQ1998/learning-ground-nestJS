import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ACCOUNT_STATUS } from '../account.constant';

// DTO must have a decorator or else GlobalPipe will strip the property
// because we are configuring whitelist = true
export class UpdateAccounttDto {
  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  @IsOptional()
  ldapID: string;

  @IsString()
  @IsOptional()
  fullName: string;

  @IsString()
  @IsOptional()
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
