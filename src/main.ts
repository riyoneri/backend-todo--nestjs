import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import { JsonDB, Config } from 'node-json-db';

export const db = new JsonDB(new Config('todos-db', true, true, '/'));
db.push('/categories', []);
db.push('/tasks', []);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
