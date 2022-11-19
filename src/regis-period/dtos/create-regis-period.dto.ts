import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRegisPeriodDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsDateString()
  registerEndDate: string;

  @IsOptional()
  @IsString()
  expenseListId: string;
}
