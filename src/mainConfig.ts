import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export function mainConfig(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      enableDebugMessages: true,
      whitelist: true,
      forbidUnknownValues: true,
    }),
  );
  app.use(cookieParser());
}
