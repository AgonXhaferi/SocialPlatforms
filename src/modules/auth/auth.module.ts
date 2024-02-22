import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';

import { ConfigInjectionToken } from '@modules/auth/supertoken-config.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupertokensService } from '@modules/auth/services/supertokens.service';
import { AuthMiddleware } from '@modules/auth/middleware/auth.middleware';

@Module({
  providers: [],
  exports: [],
  controllers: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot(): DynamicModule {
    return {
      providers: [
        {
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            appInfo: {
              appName: configService.getOrThrow<string>('APP_NAME'),
              apiDomain: configService.getOrThrow<string>('API_DOMAIN'),
              websiteDomain: configService.getOrThrow<string>('WEBSITE_DOMAIN'),
              apiBasePath: '/supertoken',
              websiteBasePath: '/supertoken',
            },
            connectionURI: configService.getOrThrow<string>(
              'SUPERTOKENS_CORE_CONNECTION_URI',
            ),
            apiKey: configService.getOrThrow<string>('SUPERTOKENS_API_KEY'),
          }),
          provide: ConfigInjectionToken,
        },
        SupertokensService,
      ],
      exports: [],
      imports: [ConfigModule.forRoot()],
      module: AuthModule,
    };
  }
}
