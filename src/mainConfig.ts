import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

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
  app.enableCors();
  app.use(cookieParser());
  app.use(helmet());

  const swaggerDocumentConfig = new DocumentBuilder()
    .setTitle('Fund management API')
    .setDescription('List of API')
    .setVersion('1.0')
    .build();
  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, swaggerDocumentConfig),
  );
}
