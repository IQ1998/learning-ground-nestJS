import {
  IsDate,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateRegisPeriodDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsDateString()
  @IsOptional()
  registerEndDate: string;

  @IsOptional()
  @IsString()
  expenseListId: string;
}
