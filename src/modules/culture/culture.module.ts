import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCultureController } from '@modules/culture/interface/adapters/http/create-culture.controller';
import { CreateCultureCommandHandler } from '@modules/culture/application/commands/create-culture.command-handler';
import { CulturePersistenceEntity } from '@modules/culture/database/entities/culture.persistence.entity';
import { CultureArticlesPersistenceEntity } from '@modules/culture/database/entities/culture-articles.persistence.entity';
import { CultureEventsPersistenceEntity } from '@modules/culture/database/entities/culture-events.persistence.entity';
import { CULTURE_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureRepositoryAdapter } from '@modules/culture/infrastructure/adapter/culture.repository.adapter';
import { CreateCultureService } from '@modules/culture/application/services/culture/create-culture.service';
import { CultureMapper } from '@modules/culture/mapper/culture.mapper';

const httpControllers = [CreateCultureController];

const commandHandlers: Provider[] = [CreateCultureCommandHandler];
const services: Provider[] = [CreateCultureService];

const mappers: Provider[] = [CultureMapper];

const repositories: Provider[] = [
  {
    provide: CULTURE_REPOSITORY,
    useClass: CultureRepositoryAdapter,
  },
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      CulturePersistenceEntity,
      CultureArticlesPersistenceEntity,
      CultureEventsPersistenceEntity,
    ]),
  ],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...repositories, ...services, ...mappers],
})
export class CultureModule {}
