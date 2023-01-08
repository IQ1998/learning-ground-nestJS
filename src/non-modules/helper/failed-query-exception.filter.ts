import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { FailedQueryException } from '../customExceptions/failed-query.exception';
import appConfigs from './configs';

@Catch(FailedQueryException)
export class FailedQueryExceptionFilter implements ExceptionFilter {
  catch(exception: FailedQueryException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const timestamp = new Date().toISOString();
    console.log(
      `[${timestamp}] -- ${request.url} Query failed: `,
      JSON.stringify(exception.getResponse()),
    );
    if (appConfigs.nodeEnv !== 'production') {
      response.status(status).json(exception.getResponse());
    } else {
      response.status(status).json({
        statusCode: status,
        message: 'Internal server error',
      });
    }
  }
}
