import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mainConfig } from './mainConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  mainConfig(app);
  await app.listen(3000);
}
bootstrap();
