import { Mapper } from '@libs/ddd';
import { UserChatEntity } from '@modules/user/domain/entities/user-chat.entity';
import { UserChatPersistenceEntity } from '@modules/user/database/entities/user-chat.persistence.entity';
import { UserChatResponse } from '@modules/user/interface/adapters/response/user-chat.response';
import { Injectable } from '@nestjs/common';
import { UserMessageMapper } from '@modules/user/mapper/user-message.mapper';

@Injectable()
export class UserChatMapper
  implements
    Mapper<UserChatEntity, UserChatPersistenceEntity, UserChatResponse>
{
  constructor(private userMessageMapper: UserMessageMapper) {}

  toPersistence(entity: UserChatEntity): UserChatPersistenceEntity {
    const record = entity.getProps();

    return new UserChatPersistenceEntity(record.userOneId, record.userTwoId);
  }

  toDomain(record: UserChatPersistenceEntity): UserChatEntity {
    return new UserChatEntity({
      id: record.id,
      props: {
        userOneId: record.userOne,
        userTwoId: record.userTwo,
        userMessages: record.userMessages.map(this.userMessageMapper.toDomain),
      },
    });
  }

  toResponse(entity: UserChatEntity): UserChatResponse {
    return new UserChatResponse({
      chatId: entity.getProps().id,
      userOneId: entity.getProps().userOneId,
      userTwoId: entity.getProps().userTwoId,
      userMessages: entity
        .getProps()
        .userMessages.map(this.userMessageMapper.toResponse),
    });
  }
}
