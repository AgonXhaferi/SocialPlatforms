import { AggregateID, RepositoryPort } from '@libs/ddd';
import { UserChatEntity } from '@modules/user/domain/entities/user-chat.entity';

export interface UserChatRepositoryPort
  extends RepositoryPort<UserChatEntity, AggregateID> {}
