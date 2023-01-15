import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  desc: string;
}
