import { ExceptionFilter, Catch, ArgumentsHost, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CONFIGURATION_PROVIDE_TOKEN,
  IAppConfig,
} from '../../app-config/app-config.module';
import { FailedQueryException } from '../customExceptions/failed-query.exception';

@Catch(FailedQueryException)
export class FailedQueryExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(CONFIGURATION_PROVIDE_TOKEN)
    private readonly appConfig: IAppConfig,
  ) {}

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
    if (this.appConfig.nodeEnv !== 'production') {
      response.status(status).json(exception.getResponse());
    } else {
      response.status(status).json({
        statusCode: status,
        message: 'Internal server error',
      });
    }
  }
}
