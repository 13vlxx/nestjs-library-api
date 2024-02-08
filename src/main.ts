import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MongoDBExceptionFilter } from './_utils/exceptions/query-duplicate.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .useGlobalFilters(new MongoDBExceptionFilter())
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    .enableCors();
  await app.listen(3000);
}
bootstrap();
