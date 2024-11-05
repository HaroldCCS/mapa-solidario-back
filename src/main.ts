import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
if (process.argv?.find((arg) => arg === 'mode-test')) {
  console.log('mode-test');
  bootstrap();
}