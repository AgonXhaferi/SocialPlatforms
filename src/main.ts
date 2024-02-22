import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { SupertokensExceptionFilter } from '@modules/auth/middleware/auth.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors();

  app.useLogger(app.get(Logger));

  app.useGlobalFilters(new SupertokensExceptionFilter());

  await app.listen(3000);
}

bootstrap();
