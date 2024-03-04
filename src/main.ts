import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const cors = require('cors');
  const app = await NestFactory.create(AppModule);
  app.use(cors);
  app.useGlobalPipes(new ValidationPipe({forbidUnknownValues: false}));
  await app.listen(4000,'0.0.0.0' || 'localhost');
}
bootstrap();
