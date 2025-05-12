import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  if (!process.env.PORT) {
    throw new BadRequestException('PORT não declarada');
  }

  await app.listen(process.env.PORT);
}
void bootstrap();
