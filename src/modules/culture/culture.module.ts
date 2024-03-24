import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCultureController } from '@modules/culture/interface/adapters/http/create-culture.controller';
import { CreateCultureCommandHandler } from '@modules/culture/application/commands/create-culture.command-handler';
import { CulturePersistenceEntity } from '@modules/culture/database/entities/culture.persistence.entity';
import { CultureArticlesPersistenceEntity } from '@modules/culture/database/entities/culture-articles.persistence.entity';
import { CultureEventsPersistenceEntity } from '@modules/culture/database/entities/culture-events.persistence.entity';
import {
  CULTURE_ARTICLES_REPOSITORY,
  CULTURE_EVENTS_REPOSITORY,
  CULTURE_REPOSITORY,
  CULTURE_SUBSCRIPTIONS_REPOSITORY,
} from '@modules/culture/culture.di-tokens';
import { CultureRepositoryAdapter } from '@modules/culture/infrastructure/adapter/culture.repository.adapter';
import { CreateCultureService } from '@modules/culture/application/services/culture/create-culture.service';
import { CultureMapper } from '@modules/culture/mapper/culture.mapper';
import { CultureSubscriptionsPersistenceEntity } from '@modules/culture/database/entities/culture-subscriptions.persistence.entity';
import { CultureSubscriptionsMapper } from '@modules/culture/mapper/culture-subscriptions.mapper';
import { CultureArticleMapper } from '@modules/culture/mapper/culture-article.mapper';
import { CultureEventMapper } from '@modules/culture/mapper/culture-event.mapper';
import { CultureSubscriptionsRepositoryAdapter } from '@modules/culture/infrastructure/adapter/culture-subscriptions.repository.adapter';
import { CultureEventRepositoryAdapter } from '@modules/culture/infrastructure/adapter/culture-event.repository.adapter';

const httpControllers = [CreateCultureController];

const commandHandlers: Provider[] = [CreateCultureCommandHandler];
const services: Provider[] = [CreateCultureService];

const mappers: Provider[] = [
  CultureMapper,
  CultureSubscriptionsMapper,
  CultureArticleMapper,
  CultureEventMapper,
];

const repositories: Provider[] = [
  {
    provide: CULTURE_REPOSITORY,
    useClass: CultureRepositoryAdapter,
  },
  {
    provide: CULTURE_ARTICLES_REPOSITORY,
    useClass: CultureRepositoryAdapter,
  },
  {
    provide: CULTURE_SUBSCRIPTIONS_REPOSITORY,
    useClass: CultureSubscriptionsRepositoryAdapter,
  },
  {
    provide: CULTURE_EVENTS_REPOSITORY,
    useClass: CultureEventRepositoryAdapter,
  },
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      CulturePersistenceEntity,
      CultureArticlesPersistenceEntity,
      CultureEventsPersistenceEntity,
      CultureSubscriptionsPersistenceEntity,
    ]),
  ],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...repositories, ...services, ...mappers],
})
export class CultureModule {}
