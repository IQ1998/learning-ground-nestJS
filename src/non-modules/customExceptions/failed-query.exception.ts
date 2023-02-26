import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export interface IFailedQueryException {
  code: string;
  query: string;
  message: string;
  failedAt: string;
}
export class FailedQueryException extends HttpException {
  constructor(errorPayload: IFailedQueryException) {
    super(
      {
        ...errorPayload,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
export class FailedQueryExceptionDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  query: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  failedAt: string;
}
