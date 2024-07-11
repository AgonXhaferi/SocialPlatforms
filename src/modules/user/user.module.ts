import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserHttpController } from '@modules/user/interface/adapters/http/user.http.controller';
import { CreateUserCommandHandler } from '@modules/user/application/commands/command-handlers/create-user.command-handler';
import { CreateUserService } from '@modules/user/application/services/create-user.service';
import {
  USER_CHAT_REPOSITORY,
  USER_FOLLOWING_REPOSITORY,
  USER_MESSAGE_REPOSITORY,
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
import { FindUsersByIdsQueryHandler } from '@modules/user/application/queries/query-handlers/find-users-by-ids-query.handler';
import { FindUserByIdQueryHandler } from '@modules/user/application/queries/query-handlers/find-user-by-id.query.handler';
import { FindAreUsersFollowersQueryHandler } from '@modules/user/application/queries/query-handlers/find-are-users-followers.query.handler';
import { ChatGateway } from '@modules/user/interface/adapters/websocket-gateway/chat.gateway';
import { UserMessagePersistenceEntity } from '@modules/user/database/entities/user-message.persistence.entity';
import { UserChatPersistenceEntity } from '@modules/user/database/entities/user-chat.persistence.entity';
import { UserMessageRepositoryAdapter } from '@modules/user/infrastructure/adapter/user-message.repository.adapter';
import { UserChatRepositoryAdapter } from '@modules/user/infrastructure/adapter/user-chat.repository.adapter';
import { UserMessageMapper } from '@modules/user/mapper/user-message.mapper';
import { UserChatMapper } from '@modules/user/mapper/user-chat.mapper';
import { ChatHttpController } from '@modules/user/interface/adapters/http/chat.http.controller';
import { CreateUserMessageCommandHandler } from '@modules/user/application/commands/command-handlers/create-user-message.command.handler';
import { CreateChatCommandHandler } from '@modules/user/application/commands/command-handlers/create-chat.command-handler';
import { CreateUserMessageService } from '@modules/user/application/services/create-user-message.service';
import { CreateChatService } from '@modules/user/application/services/create-chat.service';

const httpControllers = [UserHttpController, ChatHttpController];

const commandHandlers: Provider[] = [
  CreateUserCommandHandler,
  CreateUserFollowingCommandHandler,
  CreateUserMessageCommandHandler,
  CreateChatCommandHandler,
];

const websocketGateway: Provider[] = [ChatGateway];

const queryHandlers: Provider[] = [
  FindUsersByIdsQueryHandler,
  FindUserByIdQueryHandler,
  FindAreUsersFollowersQueryHandler,
];

const services: Provider[] = [
  CreateUserService,
  CreateUserFollowingService,
  CreateUserMessageService,
  CreateChatService,
];

const mappers: Provider[] = [
  UserMapper,
  UserFollowingMapper,
  UserMessageMapper,
  UserChatMapper,
];

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepositoryAdapter,
  },
  {
    provide: USER_FOLLOWING_REPOSITORY,
    useClass: UserFollowingRepositoryAdapter,
  },
  {
    provide: USER_MESSAGE_REPOSITORY,
    useClass: UserMessageRepositoryAdapter,
  },
  {
    provide: USER_CHAT_REPOSITORY,
    useClass: UserChatRepositoryAdapter,
  },
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      UserPersistenceEntity,
      UserFollowingPersistenceEntity,
      UserMessagePersistenceEntity,
      UserChatPersistenceEntity,
    ]),
  ],
  controllers: [...httpControllers],
  providers: [
    ...commandHandlers,
    ...services,
    ...repositories,
    ...mappers,
    ...queryHandlers,
    ...websocketGateway,
  ],
})
export class UserModule {}
