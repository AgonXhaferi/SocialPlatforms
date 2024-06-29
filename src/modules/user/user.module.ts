import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserHttpController } from '@modules/user/interface/adapters/http/user.http.controller';
import { CreateUserCommandHandler } from '@modules/user/application/commands/command-handlers/create-user.command-handler';
import { CreateUserService } from '@modules/user/application/services/create-user.service';
import {
  USER_FOLLOWING_REPOSITORY,
  USER_REPOSITORY,
} from '@modules/user/user.di-tokens';
import { UserRepositoryAdapter } from '@modules/user/infrastructure/adapter/user.repository.adapter';
import { UserMapper } from '@modules/user/mapper/user.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPersistenceEntity } from '@modules/user/database/entities/user.persistence.entity';
import { UserFollowingPersistenceEntity } from '@modules/user/database/entities/user-following.persistence.entity';
import { UserFollowingMapper } from '@modules/user/mapper/user-following.mapper';
import { UserFollowingRepositoryAdapter } from '@modules/user/infrastructure/adapter/user-following.repository.adapter';
import { CreateUserFollowingService } from '@modules/user/application/services/create-user-following.service';
import { CreateUserFollowingCommandHandler } from '@modules/user/application/commands/command-handlers/create-user-following.command-handler';
import { GetUsersByIdsQueryHandler } from '@modules/user/application/queries/query-handlers/get-users-by-ids.query.handler';

const httpControllers = [UserHttpController];

const commandHandlers: Provider[] = [
  CreateUserCommandHandler,
  CreateUserFollowingCommandHandler,
];

const queryHandlers: Provider[] = [GetUsersByIdsQueryHandler];

const services: Provider[] = [CreateUserService, CreateUserFollowingService];

const mappers: Provider[] = [UserMapper, UserFollowingMapper];

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepositoryAdapter,
  },
  {
    provide: USER_FOLLOWING_REPOSITORY,
    useClass: UserFollowingRepositoryAdapter,
  },
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      UserPersistenceEntity,
      UserFollowingPersistenceEntity,
    ]),
  ],
  controllers: [...httpControllers],
  providers: [
    ...commandHandlers,
    ...services,
    ...repositories,
    ...mappers,
    ...queryHandlers,
  ],
})
export class UserModule {}
