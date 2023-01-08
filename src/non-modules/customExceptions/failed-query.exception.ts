import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedQueryException extends HttpException {
  constructor(errorPayload: {
    code: string;
    query: string;
    message: string;
    failedAt: string;
  }) {
    super(
      {
        ...errorPayload,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
