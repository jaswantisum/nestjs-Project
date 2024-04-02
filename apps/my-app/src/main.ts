import { NestFactory } from '@nestjs/core';
import { MyAppModule } from './my-app.module';
import * as dotenv from 'dotenv';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(MyAppModule);
  await app.listen(3005);
}
bootstrap();
