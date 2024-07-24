import { AggregateID, RepositoryPort } from '@libs/ddd';
import { UserChatEntity } from '@modules/user/domain/entities/user-chat.entity';
import { DoesChatExistDto } from '@modules/user/infrastructure/dto/does-chat-exist.dto';

export interface UserChatRepositoryPort
  extends RepositoryPort<UserChatEntity, AggregateID> {
  doesChatExist(doesChatExistDto: DoesChatExistDto): Promise<boolean>;
}
