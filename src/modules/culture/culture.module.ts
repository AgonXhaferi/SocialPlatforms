import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCultureController } from '@modules/culture/interface/adapters/http/create-culture.controller';
import { CreateCultureCommandHandler } from '@modules/culture/application/commands/create-culture.command-handler';
import { CulturePersistenceEntity } from '@modules/culture/database/entities/culture.persistence.entity';
import { CultureArticlesPersistenceEntity } from '@modules/culture/database/entities/culture-articles.persistence.entity';
import { CultureEventsPersistenceEntity } from '@modules/culture/database/entities/culture-events.persistence.entity';

const httpControllers = [CreateCultureController];

const commandHandlers: Provider[] = [CreateCultureCommandHandler];
// const services: Provider[] = [CreateCultureService];
//
// const mappers: Provider[] = [CultureMapper];
//
// const repositories: Provider[] = [
//   {
//     provide: CULTURE_REPOSITORY,
//     useClass: CultureRepositoryAdapter,
//   },
// ];

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
  providers: [...commandHandlers],
})
export class CultureModule {}
