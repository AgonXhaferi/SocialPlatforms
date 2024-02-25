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
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationConstants } from '@modules/shared/constants/application.constants';
import { routesV1 } from '@config/app.routes';
import { AuthHttpController } from '@modules/auth/interface/adapters/auth.controller';

@Module({
  imports: [CqrsModule, ConfigModule],
  providers: [],
  exports: [],
  controllers: [AuthHttpController],
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
              appName: configService.getOrThrow<string>(
                ApplicationConstants.APP_NAME,
              ),
              apiDomain: configService.getOrThrow<string>(
                ApplicationConstants.API_DOMAIN,
              ),
              websiteDomain: configService.getOrThrow<string>(
                ApplicationConstants.WEBSITE_DOMAIN,
              ),
              apiBasePath: `/supertokens`,
              websiteBasePath: `/supertokens`,
            },
            connectionURI: configService.getOrThrow<string>(
              ApplicationConstants.SUPERTOKENS_CORE_CONNECTION_URI,
            ),
            apiKey: configService.getOrThrow<string>(
              ApplicationConstants.SUPERTOKENS_API_KEY,
            ),
          }),
          provide: ConfigInjectionToken,
        },
        SupertokensService,
      ],
      exports: [],
      imports: [],
      module: AuthModule,
    };
  }
}
