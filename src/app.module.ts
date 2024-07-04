import { Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@config/database/database.module';
import { UserModule } from '@modules/user/user.module';
import { RequestContextModule } from 'nestjs-request-context';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from '@modules/auth/auth.module';
import { RequestContextService } from '@libs/application/context/AppRequestContext';
import * as nanoid from 'nanoid';
import { ContextInterceptor } from '@libs/application/context/ContextInterceptor';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CultureModule } from '@modules/culture/culture.module';
import { ChatModule } from '@modules/chat/chat.module';

const eventEmitter: Provider = {
  provide: EventEmitter2,
  useClass: EventEmitter2,
};

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

@Module({
  imports: [
    RequestContextModule,
    EventEmitterModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        genReqId: (_req, res) => {
          const existingID =
            RequestContextService.getRequestId() ?? nanoid.nanoid(6);
          res.setHeader('X-Request-Id', existingID);
          return existingID;
        },
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    AuthModule.forRoot(),
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    CultureModule,
    CqrsModule,
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      ignoreErrors: false,
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, eventEmitter, ...interceptors],
})
export class AppModule {}
